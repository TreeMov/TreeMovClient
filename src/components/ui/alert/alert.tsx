import type {
  AlertDescriptionProps,
  AlertProps,
  AlertTitleProps,
} from './types'

import * as React from 'react'

import { cn } from '@/utils/helpers//shadcn'

import { alertVariants } from './constants'

const Alert: React.FC<AlertProps> = ({
  className,
  variant,
  ...props
}) => {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

const AlertTitle: React.FC<AlertTitleProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
        className
      )}
      {...props}
    />
  )
}

const AlertDescription: React.FC<AlertDescriptionProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
