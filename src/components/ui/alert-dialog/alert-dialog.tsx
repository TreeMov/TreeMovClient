'use client'

import type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
  AlertDialogMediaProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
} from './types'

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/helpers//shadcn'

const AlertDialog: React.FC<AlertDialogProps> = ({ ...props }) => {
  return (
    <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
  )
}

const AlertDialogTrigger: React.FC<AlertDialogTriggerProps> = ({
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      {...props}
    />
  )
}

const AlertDialogPortal: React.FC<AlertDialogPortalProps> = ({
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Portal
      data-slot="alert-dialog-portal"
      {...props}
    />
  )
}

const AlertDialogOverlay: React.FC<AlertDialogOverlayProps> = ({
  className,
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-100 bg-black/50',
        className
      )}
      {...props}
    />
  )
}

const AlertDialogContent: React.FC<AlertDialogContentProps> = ({
  className,
  size = 'default',
  ...props
}) => {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          'group/alert-dialog-content grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-xl bg-white p-4 duration-200 data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'fixed top-[50%] left-[50%] z-100 translate-x-[-50%] translate-y-[-50%]',
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        'grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]',
        className
      )}
      {...props}
    />
  )
}

const AlertDialogFooter: React.FC<AlertDialogFooterProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn('flex items-center justify-end gap-5', className)}
      {...props}
    />
  )
}

const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({
  className,
  ...props
}) => {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        'text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2',
        className
      )}
      {...props}
    />
  )
}

const AlertDialogDescription: React.FC<
  AlertDialogDescriptionProps
> = ({ className, ...props }) => {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

const AlertDialogMedia: React.FC<AlertDialogMediaProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "bg-muted mb-2 inline-flex size-16 items-center justify-center rounded-md sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
        className
      )}
      {...props}
    />
  )
}

const AlertDialogAction: React.FC<AlertDialogActionProps> = ({
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Action
        data-slot="alert-dialog-action"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

const AlertDialogCancel: React.FC<AlertDialogCancelProps> = ({
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Cancel
        data-slot="alert-dialog-cancel"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
