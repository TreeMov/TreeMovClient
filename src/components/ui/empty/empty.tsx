import type {
  EmptyContentProps,
  EmptyDescriptionProps,
  EmptyHeaderProps,
  EmptyMediaProps,
  EmptyProps,
  EmptyTitleProps,
} from './types'

import * as React from 'react'

import { cn } from '@/utils/helpers//shadcn'

import { emptyMediaVariants } from './constants'

const Empty: React.FC<EmptyProps> = ({ className, ...props }) => {
  return (
    <div
      data-slot="empty"
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12',
        className
      )}
      {...props}
    />
  )
}

const EmptyHeader: React.FC<EmptyHeaderProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        'flex max-w-sm flex-col items-center gap-2 text-center',
        className
      )}
      {...props}
    />
  )
}

const EmptyMedia: React.FC<EmptyMediaProps> = ({
  className,
  variant = 'default',
  ...props
}) => {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

const EmptyTitle: React.FC<EmptyTitleProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="empty-title"
      className={cn('text-lg font-medium tracking-tight', className)}
      {...props}
    />
  )
}

const EmptyDescription: React.FC<EmptyDescriptionProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        'text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  )
}

const EmptyContent: React.FC<EmptyContentProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance',
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
