import { connectInterceptors, createAxiosInstance } from '../helpers'

export const authInstance = createAxiosInstance({
  baseURL: import.meta.env.VITE_AUTH_ENDPOINT,
})
connectInterceptors(authInstance)
