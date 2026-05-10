import type { SessionSchemaKeys, SessionValuesKeys } from './types'

export const sessionKeys: Record<
  SessionSchemaKeys,
  SessionValuesKeys
> = {
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  X_ORG_MEMBER_ID: 'X-ORG-MEMBER-ID',
}
