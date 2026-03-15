import { AxiosError } from 'axios'

export const checkErrorStatus = (error: unknown) => {
  if (error instanceof AxiosError) {
    return typeof error.status !== 'undefined' && error.status >= 300
  }

  return false
}

export const retry = (failureCount: number, error: unknown) => {
  const retryCount = 3
  const result = failureCount < retryCount
  if (error instanceof AxiosError) {
    if (checkErrorStatus(error)) {
      return false
    }
  }
  return result
}

export const throwOnError = (error: Error) => checkErrorStatus(error)
