import { defineConfig } from '@kubb/core'
import type { ResolveNameParams } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'

import {
  getOutputPath,
  normalizeOperationIds,
  stripHeaderParameters,
} from './utils'
import { banner } from '../constants'

const toKebabCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const transformName = (
  name: ResolveNameParams['name'],
  type?: ResolveNameParams['type']
) => {
  if (!type || type === 'file') {
    const kebabName = toKebabCase(name)
    return kebabName || 'generated-file'
  }

  return name
}

export const createConfig = (
  baseUrl: string,
  clientPath: string,
  key?: string
) =>
  defineConfig(async () => {
    const response = await fetch(baseUrl)
    if (!response.ok) {
      throw new Error(
        `Failed to load OpenAPI spec: ${response.status} ${response.statusText}`
      )
    }

    const openApiSource = await response.json()
    const openApiWithoutHeaders = stripHeaderParameters(openApiSource)
    const openApiNormalized = normalizeOperationIds(
      openApiWithoutHeaders
    )

    return {
      root: '.',
      input: {
        data: openApiNormalized,
      },
      output: {
        path: getOutputPath(key),
        clean: true,
        write: true,
      },
      hooks: {
        done: `node ./generator/api/scripts/normalize-generated-files.mjs "${getOutputPath(
          key
        )}"`,
      },
      plugins: [
        pluginOas({
          validate: true,
          group: {
            type: 'tag',
            name({ group }) {
              return `${group}Controller`
            },
          },
        }),
        pluginTs({
          output: {
            path: './types',
            banner,
          },
          group: {
            type: 'tag',
            name: ({ group }) => `${group}Controller`,
          },
          enumType: 'asConst',
          enumSuffix: 'Enum',
          dateType: 'string',
          unknownType: 'unknown',
          optionalType: 'questionTokenAndUndefined',
          transformers: {
            name: transformName,
          },
        }),
        pluginClient({
          output: {
            path: './clients/axios',
            barrelType: 'named',
            banner,
          },
          group: {
            type: 'tag',
            name: ({ group }) => `${group}Service`,
          },
          operations: true,
          importPath: clientPath,
          transformers: {
            name: transformName,
          },
        }),
        pluginReactQuery({
          output: {
            path: './hooks',
            banner,
          },
          group: {
            type: 'tag',
            name: ({ group }) => `${group}Hooks`,
          },
          client: {
            dataReturnType: 'data',
            importPath: clientPath,
          },
          mutation: {
            methods: ['post', 'patch', 'put', 'delete'],
          },
          infinite: {
            queryParam: 'page',
            initialPageParam: 1,
            cursorParam: 'nextCursor',
          },
          query: {
            methods: ['get'],
            importPath: '@tanstack/react-query',
          },
          suspense: {},
          transformers: {
            name: transformName,
          },
        }),
      ],
    }
  })
