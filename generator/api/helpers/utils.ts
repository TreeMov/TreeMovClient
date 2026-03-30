import { HTTP_METHODS } from '../constants'
import { OpenApiParameter, OpenApiSpec } from '../types'

const splitToTokens = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .toLowerCase()
    .split('_')
    .filter(Boolean)

const getUniqueOperationId = (
  baseName: string,
  usedNames: Set<string>
) => {
  let candidate = baseName
  let index = 2

  while (usedNames.has(candidate)) {
    candidate = `${baseName}_${index}`
    index += 1
  }

  usedNames.add(candidate)
  return candidate
}

const buildFallbackOperationId = (
  pathKey: string,
  method: string
) => {
  const pathTokens = splitToTokens(pathKey)
  const tokens = [method, ...pathTokens]
  return tokens.join('_') || `${method}_operation`
}

export const ensureUniqueOperationIds = (
  source: OpenApiSpec
): OpenApiSpec => {
  const spec = structuredClone(source) as OpenApiSpec
  const paths = spec.paths

  if (!paths || typeof paths !== 'object') {
    return spec
  }

  const operations: Array<{
    method: string
    pathKey: string
    operation: Record<string, unknown>
    rawOperationId?: string
  }> = []
  const operationIdCounts = new Map<string, number>()

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
        typeof typedOperation.operationId === 'string' &&
        typedOperation.operationId.trim()
          ? typedOperation.operationId.trim()
          : undefined

      operations.push({
        method,
        pathKey,
        operation: typedOperation,
        rawOperationId,
      })

      if (rawOperationId) {
        operationIdCounts.set(
          rawOperationId,
          (operationIdCounts.get(rawOperationId) ?? 0) + 1
        )
      }
    }
  }

  const usedNames = new Set<string>()

  for (const { rawOperationId } of operations) {
    if (
      rawOperationId &&
      (operationIdCounts.get(rawOperationId) ?? 0) === 1
    ) {
      usedNames.add(rawOperationId)
    }
  }

  for (const {
    method,
    pathKey,
    operation,
    rawOperationId,
  } of operations) {
    if (
      rawOperationId &&
      (operationIdCounts.get(rawOperationId) ?? 0) === 1
    ) {
      operation.operationId = rawOperationId
      continue
    }

    const fallbackOperationId = buildFallbackOperationId(
      pathKey,
      method
    )
    operation.operationId = getUniqueOperationId(
      fallbackOperationId,
      usedNames
    )
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
