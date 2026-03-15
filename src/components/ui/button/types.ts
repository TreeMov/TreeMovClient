import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import type { IconProps } from '../icon/types'
import type { buttonVariants } from './constants'

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isPending?: boolean
    prependIcon?: IconProps
    appendIcon?: IconProps
  }
