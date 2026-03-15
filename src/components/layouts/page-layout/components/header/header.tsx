import type { HeaderProps } from './types'

import { Slot } from 'radix-ui'
import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/utils/helpers/shadcn'

export const Header: React.FC<HeaderProps> = ({
  breadcrumbs,
  className,
  children,
  ...props
}) => {
  const breadcrumbsCount = breadcrumbs.length
  const isManyBreadcrumbs = breadcrumbsCount > 1

  return (
    <div
      className={cn(
        className,
        'flex items-center justify-between gap-2.5'
      )}
      {...props}
    >
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((key, idx) => (
            <React.Fragment key={key}>
              <BreadcrumbItem>
                <BreadcrumbPage
                  className={cn({
                    'text-grey-500':
                      isManyBreadcrumbs &&
                      idx === breadcrumbsCount - 1,
                  })}
                >
                  {key}
                </BreadcrumbPage>
              </BreadcrumbItem>
              {idx !== breadcrumbs.length - 1 && (
                <BreadcrumbSeparator>
                  <Typography size="xl">
                    <span>/</span>
                  </Typography>
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Slot.Root className="ml-auto">{children}</Slot.Root>
    </div>
  )
}
