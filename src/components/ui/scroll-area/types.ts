import type { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'
import type * as React from 'react'

export type ScrollAreaProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.Root
>

export type ScrollBarProps = React.ComponentProps<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>
