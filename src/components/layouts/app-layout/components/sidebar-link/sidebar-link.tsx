import type { SidebarLinkProps } from './types'

import React from 'react'
import { Link } from 'react-router'

import { cn } from '@/utils/helpers/shadcn'

export const SidebarLink = ({
  children,
  className,
  isActive,
  ...props
}: React.PropsWithChildren<SidebarLinkProps>) => {
  return (
    <Link
      className={cn(
        className,
        'flex min-h-12 items-center rounded-2xl px-6 py-4 font-bold text-white transition-colors hover:bg-violet-700 hover:underline',
        { 'bg-violet-700': isActive }
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
