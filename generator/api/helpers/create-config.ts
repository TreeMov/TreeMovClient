import { defineConfig, type ResolveNameParams } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import {
  clientGenerator,
  operationsGenerator,
} from '@kubb/plugin-client/generators'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'

import { banner } from '../constants'
import { groupedClientGenerator } from '../generators/grouped-client-generator'
import { safeJsonGenerator } from '../generators/safe-json-generator'

import {
  ensureUniqueOperationIds,
  getOutputPath,
  stripHeaderParameters,
} from './utils'

const toKebabCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const getGroupDirectoryName = (
  group: string | undefined,
  suffix: string
) => {
  if (!group) {
    return ''
  }

  const groupName = toKebabCase(group)
  return groupName ? `${groupName}-${suffix}` : ''
}

const transformName = (
  name: ResolveNameParams['name'],
  type?: ResolveNameParams['type']
) => {
  if (type === 'file') {
    if (typeof name !== 'string' || !name.trim()) {
      return 'generated-file'
    }

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
    const openApiNormalized = ensureUniqueOperationIds(
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
      plugins: [
        pluginOas({
          validate: true,
          generators: [safeJsonGenerator],
          group: {
            type: 'tag',
            name({ group }) {
              return getGroupDirectoryName(group, 'controller')
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
            name: ({ group }) =>
              getGroupDirectoryName(group, 'controller'),
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
            name: ({ group }) =>
              getGroupDirectoryName(group, 'service'),
          },
          operations: true,
          generators: [
            clientGenerator,
            groupedClientGenerator,
            operationsGenerator,
          ],
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
            name: ({ group }) =>
              getGroupDirectoryName(group, 'hooks'),
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
