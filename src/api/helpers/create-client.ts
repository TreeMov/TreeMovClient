import type { AxiosError, AxiosInstance } from 'axios'
import type { RequestConfig, ResponseConfig } from '../types'

export const createClient =
  <TData, TError = unknown, TVariables = unknown>(
    instance: AxiosInstance
  ) =>
  async (
    config: RequestConfig<TVariables>
  ): Promise<ResponseConfig<TData>> => {
    const promise = instance
      .request<TVariables, ResponseConfig<TData>>({ ...config })
      .catch((e: AxiosError<TError>) => {
        throw e
      })

    return promise
  }
