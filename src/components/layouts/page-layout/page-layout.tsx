import type { PageLayoutProps } from './types'

import React from 'react'

import { cn } from '@/utils/helpers/shadcn'

export const PageLayout: React.FC<
  React.PropsWithChildren<PageLayoutProps>
> = ({ className, actions, scrollable = true, footer, children }) => {
  return (
    <div
      className={cn(
        className,
        'flex h-full flex-col overflow-hidden'
      )}
    >
      <div className="mb-5 ml-auto">{actions}</div>
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
