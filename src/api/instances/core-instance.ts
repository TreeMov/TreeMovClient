import { connectInterceptors, createAxiosInstance } from '../helpers'

export const coreInstance = createAxiosInstance({
  baseURL: import.meta.env.VITE_CORE_ENDPOINT,
})
connectInterceptors(coreInstance)
