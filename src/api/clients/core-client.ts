import type { RequestConfig, ResponseConfig } from '../types'

import { handleRequest } from '../helpers/handle-request'
import { coreInstance } from '../instances/core-instance'

export const coreClient = async <
  TData,
  TError = unknown,
  TVariables = unknown,
>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> =>
  handleRequest<TData, TError, TVariables>(coreInstance, config)

export default coreClient
export * from '../types'
export * from './client'
