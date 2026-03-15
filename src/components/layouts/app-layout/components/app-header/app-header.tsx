import React from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { AppUserButton } from '../app-user-button'
import { AppUserOrganization } from '../app-user-organization'

export const AppHeader: React.FC<React.ComponentProps<'header'>> = ({
  className,
  ...props
}) => {
  return (
    <header
      className={cn(className, 'flex items-center justify-end gap-4')}
      {...props}
    >
      <AppUserButton />
      <AppUserOrganization />
    </header>
  )
}
