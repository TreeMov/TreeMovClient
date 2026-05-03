import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from './types'

import { XIcon } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/helpers//shadcn'

const Dialog: React.FC<DialogProps> = ({ ...props }) => {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({
  ...props
}) => {
  return (
    <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
  )
}

const DialogPortal: React.FC<DialogPortalProps> = ({ ...props }) => {
  return (
    <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
  )
}

const DialogClose: React.FC<DialogCloseProps> = ({ ...props }) => {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

const DialogOverlay: React.FC<DialogOverlayProps> = ({
  className,
  ...props
}) => {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-100 bg-black/50',
        className
      )}
      {...props}
    />
  )
}

const DialogContent: React.FC<DialogContentProps> = ({
  className,
  children,
  showCloseButton = true,
  actions,
  ...props
}) => {
  const showActions = actions || showCloseButton

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-100 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg duration-200 outline-none sm:max-w-lg',
          className
        )}
        {...props}
      >
        <div className="mb-4 flex items-center justify-between">
          {showActions && (
            <div className="flex items-center justify-end gap-3">
              {actions}
              {showCloseButton && (
                <DialogPrimitive.Close
                  data-slot="dialog-close"
                  className="flex size-6 cursor-pointer items-center justify-center"
                >
                  <XIcon />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              )}
            </div>
          )}
        </div>
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

const DialogHeader: React.FC<DialogHeaderProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        'flex flex-col gap-2 text-center sm:text-left',
        className
      )}
      {...props}
    />
  )
}

const DialogFooter: React.FC<DialogFooterProps> = ({
  className,
  showCloseButton = false,
  children,
  ...props
}) => {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button>Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

const DialogTitle: React.FC<DialogTitleProps> = ({
  className,
  ...props
}) => {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  )
}

const DialogDescription: React.FC<DialogDescriptionProps> = ({
  className,
  ...props
}) => {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
