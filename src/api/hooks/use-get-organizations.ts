import { useMyOrgsOrganizationsMe } from '../generated/core'

export const useGetOrganizations = () =>
  useMyOrgsOrganizationsMe({
    query: { gcTime: Infinity, refetchOnMount: false },
  })
