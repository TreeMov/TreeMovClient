export type OpenApiSpec = {
  paths?: Record<string, unknown>
  components?: {
    parameters?: Record<string, unknown>
  }
}

export type OpenApiParameter = {
  in?: string
  $ref?: string
}
