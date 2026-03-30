import React from 'react'
import { Link, type LinkProps } from 'react-router'

import { cn } from '@/utils/helpers/shadcn'

export const SidebarLink = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<LinkProps>) => {
  return (
    <Link
      className={cn(
        className,
        'flex min-h-12 items-center gap-1.5 rounded-2xl px-6 font-bold text-white transition-all hover:bg-violet-700 hover:underline data-[active=true]:bg-violet-700'
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
