import type { TokenResponse } from '../generated/auth'

export type SessionTokens = TokenResponse

export type SessionSchema = TokenResponse & {
  X_ORG_MEMBER_ID: string
}

export type SessionValues = TokenResponse & {
  ['X-ORG-MEMBER-ID']: string
}

export type SessionSchemaKeys = keyof SessionSchema
export type SessionValuesKeys = keyof SessionValues
