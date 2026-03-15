import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import type { alertVariants } from './constants'

export type AlertProps = React.ComponentProps<'div'> &
  VariantProps<typeof alertVariants>

export type AlertTitleProps = React.ComponentProps<'div'>

export type AlertDescriptionProps = React.ComponentProps<'div'>
