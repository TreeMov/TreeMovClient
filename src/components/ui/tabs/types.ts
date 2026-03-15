import type { VariantProps } from 'class-variance-authority'
import type { Tabs as TabsPrimitive } from 'radix-ui'
import type * as React from 'react'
import type { tabsListVariants } from './constants'

export type TabsProps = React.ComponentProps<
  typeof TabsPrimitive.Root
>

export type TabsListProps = React.ComponentProps<
  typeof TabsPrimitive.List
> &
  VariantProps<typeof tabsListVariants>

export type TabsTriggerProps = React.ComponentProps<
  typeof TabsPrimitive.Trigger
>

export type TabsContentProps = React.ComponentProps<
  typeof TabsPrimitive.Content
>
