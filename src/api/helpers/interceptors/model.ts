import type { RefreshTokenRequest } from '@/api/generated/auth/types/refresh-token-request'
import type { TokenResponse } from '@/api/generated/auth/types/token-response'
import type { SessionTokens } from '@/api/session/types'

import {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios'

import { createAxiosInstance } from '@/api/helpers/create-instance'
import { session, sessionKeys } from '@/api/session'
import { ROUTES } from '@/utils/constants/routes-map'

export class Interceptors {
  private refreshPromis: Promise<void> | null = null
  private refreshClient = createAxiosInstance({
    baseURL: import.meta.env.VITE_AUTH_ENDPOINT,
  })

  private handleRefreshError() {
    session.deleteSession()
    window.location.href = ROUTES.signIn
  }

  private async refreshing({
    refresh_token,
  }: Pick<SessionTokens, 'refresh_token'>) {
    this.refreshPromis = new Promise<void>(
      async (resolve, reject) => {
        try {
          const { data: newTokens } =
            await this.refreshClient.post<TokenResponse>(
              '/api/v1/auth/refresh',
              {
                refresh_token,
              } satisfies RefreshTokenRequest
            )

          session.updateSession(newTokens)
        } catch (error) {
          reject(error)
        }

        resolve()
      }
    )

    await this.refreshPromis
    this.refreshPromis = null
  }

  async interceptRequest(config: InternalAxiosRequestConfig) {
    const { access_token, X_ORG_MEMBER_ID } =
      session.getSessionTokens()

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`
    }

    if (X_ORG_MEMBER_ID) {
      config.headers[sessionKeys.X_ORG_MEMBER_ID] = X_ORG_MEMBER_ID
    }

    return config
  }

  interceptError = async (
    error: AxiosError,
    instance: AxiosInstance
  ) => {
    if (error.response?.status === 401) {
      try {
        const { refresh_token } = session.getSessionTokens()
        if (!refresh_token) {
          this.handleRefreshError()
          return
        }

        const originalConfig = error.response?.config
        if (this.refreshPromis) {
          await this.refreshPromis
        } else {
          await this.refreshing({ refresh_token })
        }
        return instance.request(originalConfig!)
      } catch {
        this.handleRefreshError()
      }
    }

    const response = error.response
    throw new AxiosError(
      response?.statusText,
      undefined,
      response?.config,
      response?.request,
      response
    )
  }
}
