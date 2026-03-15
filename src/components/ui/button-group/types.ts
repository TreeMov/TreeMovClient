import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import type { Separator } from '@/components/ui/separator'
import type { buttonGroupVariants } from './constants'

export type ButtonGroupProps = React.ComponentProps<'div'> &
  VariantProps<typeof buttonGroupVariants>

export type ButtonGroupTextProps = React.ComponentProps<'div'> & {
  asChild?: boolean
}

export type ButtonGroupSeparatorProps = React.ComponentProps<
  typeof Separator
>
