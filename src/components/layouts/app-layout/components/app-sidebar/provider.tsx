import React from 'react'

import { SidebarProvider as USidebarProvider } from '@/components/ui/sidebar'

import { getDefaultValue } from './helpers'

export const SidebarProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const defaultOpen = getDefaultValue() ?? true

  return (
    <USidebarProvider defaultOpen={defaultOpen}>
      {children}
    </USidebarProvider>
  )
}
