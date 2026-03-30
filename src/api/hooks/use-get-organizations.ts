import { useOrganizationMe } from '../generated/core'

export const useGetOrganizations = () =>
  useOrganizationMe({
    query: { gcTime: Infinity, refetchOnMount: false },
  })
