import type { Nullable } from '@/types/utility'
import type { SessionSchema, SessionTokens } from './types'

import { sessionKeys } from './constants'

export class Session implements Partial<SessionSchema> {
  access_token =
    localStorage.getItem(sessionKeys.access_token) ?? undefined
  refresh_token =
    localStorage.getItem(sessionKeys.refresh_token) ?? undefined
  X_ORG_MEMBER_ID =
    localStorage.getItem(sessionKeys.X_ORG_MEMBER_ID) ?? undefined

  sessionTokens: (keyof SessionTokens)[] = [
    'access_token',
    'refresh_token',
  ]

  get organizationId() {
    if (!this.X_ORG_MEMBER_ID) {
      return null
    }
    return +this.X_ORG_MEMBER_ID
  }

  get hasOrganization() {
    return !!this.X_ORG_MEMBER_ID
  }

  changeOrg(id: number) {
    localStorage.setItem(sessionKeys.X_ORG_MEMBER_ID, `${id}`)
  }

  hasSession() {
    return this.sessionTokens.every(
      (key) => localStorage.getItem(key) !== null
    )
  }

  createSession(tokens: SessionTokens) {
    for (const key of this.sessionTokens) {
      localStorage.setItem(key, tokens[key])
    }
  }

  updateSession(tokens: SessionTokens) {
    this.createSession(tokens)
  }

  deleteSession() {
    for (const key of Object.values(sessionKeys)) {
      localStorage.removeItem(key)
    }
  }

  getSessionTokens() {
    return Object.values(sessionKeys).reduce(
      (acc, key) => ({
        ...acc,
        [key]: localStorage.getItem(key),
      }),
      {} as Nullable<SessionSchema>
    )
  }
}
