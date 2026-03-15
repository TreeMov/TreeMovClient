import type { VariantProps } from 'class-variance-authority'
import type { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'
import type * as React from 'react'
import type { toggleVariants } from '@/components/ui/toggle'

export type ToggleGroupProps = React.ComponentProps<
  typeof ToggleGroupPrimitive.Root
> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }

export type ToggleGroupItemProps = React.ComponentProps<
  typeof ToggleGroupPrimitive.Item
> &
  VariantProps<typeof toggleVariants>
