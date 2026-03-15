/* eslint-disable @typescript-eslint/no-unused-vars */

import type { RequestConfig, ResponseConfig } from '../types'

export type Client = <TData, _TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
) => Promise<ResponseConfig<TData>>
