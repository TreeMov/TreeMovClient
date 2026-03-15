import { connectInterceptors, createAxiosInstance } from '../helpers'

export const emailInstance = createAxiosInstance({
  baseURL: import.meta.env.VITE_EMAIL_ENDPOINT,
})
connectInterceptors(emailInstance)
