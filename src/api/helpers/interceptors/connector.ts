import type { AxiosInstance } from 'axios'

import { Interceptors } from './model'

export const connectInterceptors = (instance: AxiosInstance) => {
  const interceptors = new Interceptors()
  instance.interceptors.request.use(interceptors.interceptRequest)
  instance.interceptors.response.use(
    (config) => config,
    (error) => interceptors.interceptError(error, instance)
  )
}
