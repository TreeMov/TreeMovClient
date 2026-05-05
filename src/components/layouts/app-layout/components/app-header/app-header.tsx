import React from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { AppHeaderBreadcrumbs } from '../app-header-breadcrumbs'
import { AppUserButton } from '../app-user-button'
import { AppUserOrganization } from '../app-user-organization'

export const AppHeader: React.FC<React.ComponentProps<'header'>> = ({
  className,
  ...props
}) => {
  return (
    <header
      className={cn(className, 'flex items-center gap-4')}
      {...props}
    >
      <AppHeaderBreadcrumbs />
      <div className="ml-auto flex items-center justify-end gap-4">
        <AppUserButton />
        <AppUserOrganization />
      </div>
    </header>
  )
}
