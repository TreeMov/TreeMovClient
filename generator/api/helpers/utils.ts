import {
  HTTP_METHOD_SET,
  HTTP_METHODS,
  VERSION_TOKEN_REGEX,
} from '../constants'
import { OpenApiParameter, OpenApiSpec } from '../types'

export const concatLines = (lines: string[]) =>
  `${lines.join(' \n ')}\n`

const splitToTokens = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .split('_')
    .filter(Boolean)

const isSkippableToken = (token: string) =>
  token === 'api' ||
  token === 'internal' ||
  HTTP_METHOD_SET.has(token) ||
  VERSION_TOKEN_REGEX.test(token)

const getUniqueTokens = (tokens: string[]) => {
  const seen = new Set<string>()
  const result: string[] = []

  for (const token of tokens) {
    if (seen.has(token)) {
      continue
    }

    seen.add(token)
    result.push(token)
  }

  return result
}

const buildOperationNameTokens = (
  rawOperationId: string | undefined,
  pathKey: string
) => {
  const operationIdTokens = rawOperationId
    ? splitToTokens(rawOperationId)
    : []
  const cleanedOperationIdTokens = operationIdTokens.filter(
    (token) => !isSkippableToken(token)
  )

  if (cleanedOperationIdTokens.length > 0) {
    return getUniqueTokens(cleanedOperationIdTokens)
  }

  const pathTokens = splitToTokens(pathKey).filter(
    (token) => !isSkippableToken(token)
  )

  if (pathTokens.length > 0) {
    return getUniqueTokens(pathTokens)
  }

  return ['operation']
}

export const normalizeOperationIds = (
  source: OpenApiSpec
): OpenApiSpec => {
  const spec = structuredClone(source) as OpenApiSpec
  const paths = spec.paths
  const usedNames = new Map<string, number>()

  if (!paths || typeof paths !== 'object') {
    return spec
  }

  for (const [pathKey, pathItem] of Object.entries(paths)) {
    if (!pathItem || typeof pathItem !== 'object') {
      continue
    }

    const typedPathItem = pathItem as Record<string, unknown>

    for (const method of HTTP_METHODS) {
      const operation = typedPathItem[method]
      if (!operation || typeof operation !== 'object') {
        continue
      }

      const typedOperation = operation as Record<string, unknown>
      const rawOperationId =
        typeof typedOperation.operationId === 'string'
          ? typedOperation.operationId
          : undefined

      const tokens = buildOperationNameTokens(rawOperationId, pathKey)
      const baseName = tokens.join('_')
      const duplicateIndex = usedNames.get(baseName) ?? 0
      const operationId =
        duplicateIndex === 0
          ? baseName
          : `${baseName}_${duplicateIndex + 1}`

      usedNames.set(baseName, duplicateIndex + 1)
      typedOperation.operationId = operationId
    }
  }

  return spec
}

const getRefParameterName = (ref: string) => {
  const prefix = '#/components/parameters/'
  if (!ref.startsWith(prefix)) {
    return null
  }
  return ref.slice(prefix.length)
}

const isHeaderParameter = (
  parameter: unknown,
  componentsParameters: Record<string, unknown> = {}
) => {
  if (!parameter || typeof parameter !== 'object') {
    return false
  }

  const param = parameter as OpenApiParameter

  if (param.in === 'header') {
    return true
  }

  if (!param.$ref) {
    return false
  }

  const parameterName = getRefParameterName(param.$ref)
  if (!parameterName) {
    return false
  }

  const referenced = componentsParameters[parameterName]
  if (!referenced || typeof referenced !== 'object') {
    return false
  }

  return (referenced as OpenApiParameter).in === 'header'
}

export const stripHeaderParameters = (
  source: unknown
): OpenApiSpec => {
  const spec = structuredClone(source) as OpenApiSpec
  const componentsParameters = spec.components?.parameters ?? {}
  const paths = spec.paths

  if (!paths || typeof paths !== 'object') {
    return spec
  }

  for (const pathItem of Object.values(paths)) {
    if (!pathItem || typeof pathItem !== 'object') {
      continue
    }

    const typedPathItem = pathItem as Record<string, unknown>
    const pathParameters = typedPathItem.parameters

    if (Array.isArray(pathParameters)) {
      typedPathItem.parameters = pathParameters.filter(
        (parameter) =>
          !isHeaderParameter(parameter, componentsParameters)
      )
    }

    for (const method of HTTP_METHODS) {
      const operation = typedPathItem[method]

      if (!operation || typeof operation !== 'object') {
        continue
      }

      const typedOperation = operation as Record<string, unknown>
      const operationParameters = typedOperation.parameters

      if (Array.isArray(operationParameters)) {
        typedOperation.parameters = operationParameters.filter(
          (parameter) =>
            !isHeaderParameter(parameter, componentsParameters)
        )
      }
    }
  }

  return spec
}

export const getOutputPath = (path?: string) => {
  const basePath = './src/api/generated'
  return path ? `${basePath}/${path}` : basePath
}
