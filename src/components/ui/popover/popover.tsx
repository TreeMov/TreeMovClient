import type {
  PopoverAnchorProps,
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverHeaderProps,
  PopoverProps,
  PopoverTitleProps,
  PopoverTriggerProps,
} from './types'

import { XIcon } from 'lucide-react'
import { Popover as PopoverPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/utils/helpers//shadcn'

const Popover: React.FC<PopoverProps> = ({ ...props }) => {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
  ...props
}) => {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      {...props}
    />
  )
}

const PopoverContent: React.FC<PopoverContentProps> = ({
  className,
  align = 'center',
  sideOffset = 4,
  children,
  showCloseButton = true,
  actions,
  ...props
}) => {
  const showActions = actions || showCloseButton

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 origin-(--radix-popover-content-transform-origin) rounded-xl bg-white px-6 py-4 shadow-md outline-hidden',
          className
        )}
        {...props}
      >
        {showActions && (
          <div className="mb-4 flex items-center justify-end gap-3">
            {actions}
            {showCloseButton && (
              <PopoverPrimitive.Close
                data-slot="popover-close"
                className="flex size-6 cursor-pointer items-center justify-center"
              >
                <XIcon />
                <span className="sr-only">Close</span>
              </PopoverPrimitive.Close>
            )}
          </div>
        )}
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}

const PopoverAnchor: React.FC<PopoverAnchorProps> = ({
  ...props
}) => {
  return (
    <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
  )
}

const PopoverHeader: React.FC<PopoverHeaderProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="popover-header"
      className={cn('flex flex-col gap-1 text-sm', className)}
      {...props}
    />
  )
}

const PopoverTitle: React.FC<PopoverTitleProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="popover-title"
      className={cn('font-medium', className)}
      {...props}
    />
  )
}

const PopoverDescription: React.FC<PopoverDescriptionProps> = ({
  className,
  ...props
}) => {
  return (
    <p
      data-slot="popover-description"
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
}
