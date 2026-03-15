import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import type { IconProps } from '../icon/types'
import type { inputVariants } from './constants'

export type InputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> & {
    prependIcon?: IconProps
    appendIcon?: IconProps
  }
