import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import type { badgeVariants } from './constants'

export type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }
