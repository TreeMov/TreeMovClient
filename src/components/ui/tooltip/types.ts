import type { Tooltip as TooltipPrimitive } from 'radix-ui'
import type * as React from 'react'

export type TooltipProviderProps = React.ComponentProps<
  typeof TooltipPrimitive.Provider
>

export type TooltipProps = React.ComponentProps<
  typeof TooltipPrimitive.Root
>

export type TooltipTriggerProps = React.ComponentProps<
  typeof TooltipPrimitive.Trigger
>

export type TooltipContentProps = React.ComponentProps<
  typeof TooltipPrimitive.Content
>
