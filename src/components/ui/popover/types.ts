import type { Popover as PopoverPrimitive } from 'radix-ui'
import type * as React from 'react'

export type PopoverProps = React.ComponentProps<
  typeof PopoverPrimitive.Root
>

export type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>

export type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
> & {
  actions?: React.ReactNode
  showCloseButton?: boolean
}

export type PopoverAnchorProps = React.ComponentProps<
  typeof PopoverPrimitive.Anchor
>

export type PopoverHeaderProps = React.ComponentProps<'div'>

export type PopoverTitleProps = React.ComponentProps<'h2'>

export type PopoverDescriptionProps = React.ComponentProps<'p'>
