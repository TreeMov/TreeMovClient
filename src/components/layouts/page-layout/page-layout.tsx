import type { PageLayoutProps } from './types'

import React from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { Header } from './components'

export const PageLayout: React.FC<PageLayoutProps> = ({
  breadcrumbs,
  children,
  actions,
  className,
  scrollable = true,
  footer,
  ...props
}) => {
  return (
    <div
      className={cn(
        className,
        'flex h-full flex-col overflow-hidden'
      )}
    >
      <Header className="mb-5" breadcrumbs={breadcrumbs} {...props}>
        {actions}
      </Header>
      <div
        className={cn({
          'h-full overflow-auto': scrollable,
          'overflow-hidden': !scrollable,
        })}
      >
        {children}
      </div>
      {footer}
    </div>
  )
}
