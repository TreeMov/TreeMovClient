import type {
  ButtonGroupProps,
  ButtonGroupSeparatorProps,
  ButtonGroupTextProps,
} from './types'

import { Slot } from 'radix-ui'
import * as React from 'react'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/utils/helpers//shadcn'

import { buttonGroupVariants } from './constants'

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  className,
  orientation,
  ...props
}) => {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

const ButtonGroupText: React.FC<ButtonGroupTextProps> = ({
  className,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot.Root : 'div'
  return (
    <Comp
      className={cn(
        "bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

const ButtonGroupSeparator: React.FC<ButtonGroupSeparatorProps> = ({
  className,
  orientation = 'vertical',
  ...props
}) => {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        'bg-input relative m-0! self-stretch data-[orientation=vertical]:h-auto',
        className
      )}
      {...props}
    />
  )
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }
