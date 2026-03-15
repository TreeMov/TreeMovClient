import type { AxiosError, AxiosInstance } from 'axios'
import type { RequestConfig, ResponseConfig } from '../types'

export const handleRequest = async <
  TData,
  TError = unknown,
  TVariables = unknown,
>(
  instance: AxiosInstance,
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> =>
  instance
    .request<TVariables, ResponseConfig<TData>>({ ...config })
    .catch((e: AxiosError<TError>) => {
      throw e
    })
