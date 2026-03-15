import type {
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from './types'

import { ChevronRight, MoreHorizontal } from 'lucide-react'
import { Slot } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/utils/helpers//shadcn'

import { Typography } from '../typography'

const Breadcrumb: React.FC<BreadcrumbProps> = ({ ...props }) => {
  return (
    <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
  )
}

const BreadcrumbList: React.FC<BreadcrumbListProps> = ({
  className,
  ...props
}) => {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
        className
      )}
      {...props}
    />
  )
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  className,
  ...props
}) => {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  )
}

const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({
  asChild,
  className,
  ...props
}) => {
  const Comp = asChild ? Slot.Root : 'a'
  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        'hover:text-foreground transition-colors',
        className
      )}
      {...props}
    />
  )
}

const BreadcrumbPage: React.FC<BreadcrumbPageProps> = (props) => {
  return (
    <Typography size="xl">
      <span
        data-slot="breadcrumb-page"
        role="link"
        aria-disabled="true"
        aria-current="page"
        {...props}
      />
    </Typography>
  )
}

const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

const BreadcrumbEllipsis: React.FC<BreadcrumbEllipsisProps> = ({
  className,
  ...props
}) => {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        'flex size-9 items-center justify-center',
        className
      )}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
