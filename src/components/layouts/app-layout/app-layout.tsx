import React from 'react'
import { Outlet } from 'react-router'

import { useGetOrganizations } from '@/api/hooks/use-get-organizations'
import { GlobalSpinner } from '@/components/ui/global-spinner'

import { AppHeader } from './components/app-header'
import { SidebarProvider } from './components/app-sidebar'
import { AppSidebar } from './components'
import { AppLayoutProvider } from './provider'

export const AppLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data, isPending } = useGetOrganizations()

  if (isPending) {
    return <GlobalSpinner />
  }

  return (
    <AppLayoutProvider organizations={data}>
      <SidebarProvider>
        <AppSidebar />
        <main className="grid max-h-screen w-full grid-rows-[auto_1fr] gap-5 overflow-hidden px-12 pt-10 pb-24">
          <AppHeader />
          {children ?? <Outlet />}
        </main>
      </SidebarProvider>
    </AppLayoutProvider>
  )
}
