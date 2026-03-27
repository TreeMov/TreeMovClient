import type { AppLayoutProviderProps } from './types'

import React, { useState } from 'react'

import { Navigate } from '@/components/shared/navigate'
import { GlobalSpinner } from '@/components/ui/global-spinner'
import { paths } from '@/router/contract'

import { AppLayoutContext } from './context'
import { AppStore } from './store'

export const AppLayoutProvider: React.FC<
  React.PropsWithChildren<AppLayoutProviderProps>
> = ({ organizations, children }) => {
  const [store] = useState(new AppStore())

  const currentOrg = organizations?.find(
    ({ id }) => id === store.orgId
  )
  const restOrgs =
    organizations?.filter(({ id }) => id !== store.orgId) ?? []

  if (!organizations?.length) {
    return <Navigate to={{ path: paths['create-org'] }} />
  }

  if (!currentOrg) {
    store.changeOrg(organizations[0].id)
    return <GlobalSpinner />
  }

  return (
    <AppLayoutContext.Provider
      value={{ store, currentOrg, restOrgs }}
    >
      {children}
    </AppLayoutContext.Provider>
  )
}
