import type { HoverCard as HoverCardPrimitive } from 'radix-ui'
import type * as React from 'react'

export type HoverCardProps = React.ComponentProps<
  typeof HoverCardPrimitive.Root
>

export type HoverCardTriggerProps = React.ComponentProps<
  typeof HoverCardPrimitive.Trigger
>

export type HoverCardContentProps = React.ComponentProps<
  typeof HoverCardPrimitive.Content
>
