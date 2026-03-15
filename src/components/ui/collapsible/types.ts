import type { Collapsible as CollapsiblePrimitive } from 'radix-ui'
import type * as React from 'react'

export type CollapsibleProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Root
>

export type CollapsibleTriggerProps = React.ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleTrigger
>

export type CollapsibleContentProps = React.ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleContent
>
