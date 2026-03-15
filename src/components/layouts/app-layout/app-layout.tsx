import React from 'react'
import { Outlet } from 'react-router'

import { AppHeader } from './components/app-header'
import { SidebarProvider } from './components/app-sidebar'
import { AppSidebar } from './components'

export const AppLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="grid max-h-screen w-full grid-rows-[auto_1fr] gap-5 overflow-hidden px-12 pt-10 pb-24">
        <AppHeader />
        {children ?? <Outlet />}
      </main>
    </SidebarProvider>
  )
}
