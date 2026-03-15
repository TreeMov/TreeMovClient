import type { Command as CommandPrimitive } from 'cmdk'
import type * as React from 'react'
import type { Dialog } from '@/components/ui/dialog'

export type CommandProps = React.ComponentProps<
  typeof CommandPrimitive
>

export type CommandDialogProps = React.ComponentProps<
  typeof Dialog
> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}

export type CommandInputProps = React.ComponentProps<
  typeof CommandPrimitive.Input
>

export type CommandListProps = React.ComponentProps<
  typeof CommandPrimitive.List
>

export type CommandEmptyProps = React.ComponentProps<
  typeof CommandPrimitive.Empty
>

export type CommandGroupProps = React.ComponentProps<
  typeof CommandPrimitive.Group
>

export type CommandSeparatorProps = React.ComponentProps<
  typeof CommandPrimitive.Separator
>

export type CommandItemProps = React.ComponentProps<
  typeof CommandPrimitive.Item
>

export type CommandShortcutProps = React.ComponentProps<'span'>
