import type {
  OrganizationMe200,
  OrganizationMemberRead,
} from '@/api/generated/core'
import type { AppStore } from './store'

export type AppLayoutContextType = {
  store: AppStore
  currentOrg: OrganizationMemberRead
  restOrgs: OrganizationMemberRead[]
}

export type AppLayoutProviderProps = {
  organizations: OrganizationMe200 | undefined
}
