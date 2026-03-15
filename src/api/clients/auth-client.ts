import type { RequestConfig, ResponseConfig } from '../types'

import { handleRequest } from '../helpers/handle-request'
import { authInstance } from '../instances/auth-instance'

export const authClient = async <
  TData,
  TError = unknown,
  TVariables = unknown,
>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> =>
  handleRequest<TData, TError, TVariables>(authInstance, config)

export default authClient
export * from '../types'
export * from './client'
