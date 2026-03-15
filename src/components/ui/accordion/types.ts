import type { Accordion as AccordionPrimitive } from 'radix-ui'
import type * as React from 'react'

export type AccordionProps = React.ComponentProps<
  typeof AccordionPrimitive.Root
>

export type AccordionItemProps = React.ComponentProps<
  typeof AccordionPrimitive.Item
>

export type AccordionTriggerProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
>

export type AccordionContentProps = React.ComponentProps<
  typeof AccordionPrimitive.Content
>
