import type { Switch as SwitchPrimitive } from 'radix-ui'
import type * as React from 'react'

export type SwitchProps = React.ComponentProps<
  typeof SwitchPrimitive.Root
> & {
  size?: 'sm' | 'default'
}
