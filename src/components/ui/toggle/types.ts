import type { VariantProps } from 'class-variance-authority'
import type { Toggle as TogglePrimitive } from 'radix-ui'
import type * as React from 'react'
import type { toggleVariants } from './constants'

export type ToggleProps = React.ComponentProps<
  typeof TogglePrimitive.Root
> &
  VariantProps<typeof toggleVariants>
