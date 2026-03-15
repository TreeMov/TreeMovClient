import type { RequestConfig, ResponseConfig } from '../types'

import { handleRequest } from '../helpers/handle-request'
import { emailInstance } from '../instances/email-instance'

export const emailClient = async <
  TData,
  TError = unknown,
  TVariables = unknown,
>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> =>
  handleRequest<TData, TError, TVariables>(emailInstance, config)

export default emailClient
export * from '../types'
export * from './client'
