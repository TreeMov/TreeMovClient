import type { AppLayoutProviderProps } from './types'

import React, { useState } from 'react'

import { GlobalSpinner } from '@/components/ui/global-spinner'

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
    return <div>create org</div>
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
