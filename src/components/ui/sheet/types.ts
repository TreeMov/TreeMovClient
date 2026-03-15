import type { Dialog as SheetPrimitive } from 'radix-ui'
import type * as React from 'react'

export type SheetProps = React.ComponentProps<
  typeof SheetPrimitive.Root
>

export type SheetTriggerProps = React.ComponentProps<
  typeof SheetPrimitive.Trigger
>

export type SheetCloseProps = React.ComponentProps<
  typeof SheetPrimitive.Close
>

export type SheetPortalProps = React.ComponentProps<
  typeof SheetPrimitive.Portal
>

export type SheetOverlayProps = React.ComponentProps<
  typeof SheetPrimitive.Overlay
>

export type SheetContentProps = React.ComponentProps<
  typeof SheetPrimitive.Content
> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
  showCloseButton?: boolean
}

export type SheetHeaderProps = React.ComponentProps<'div'>

export type SheetFooterProps = React.ComponentProps<'div'>

export type SheetTitleProps = React.ComponentProps<
  typeof SheetPrimitive.Title
>

export type SheetDescriptionProps = React.ComponentProps<
  typeof SheetPrimitive.Description
>
