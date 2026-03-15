import type { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import type * as React from 'react'

export type RadioGroupProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Root
>

export type RadioGroupItemProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>
