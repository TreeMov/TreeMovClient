import type { SessionSchemaKeys } from './types'

export const sessionKeys: Record<
  SessionSchemaKeys,
  SessionSchemaKeys
> = {
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  X_ORG_MEMBER_ID: 'X_ORG_MEMBER_ID',
}
