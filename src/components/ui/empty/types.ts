import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import type { emptyMediaVariants } from './constants'

export type EmptyProps = React.ComponentProps<'div'>

export type EmptyHeaderProps = React.ComponentProps<'div'>

export type EmptyMediaProps = React.ComponentProps<'div'> &
  VariantProps<typeof emptyMediaVariants>

export type EmptyTitleProps = React.ComponentProps<'div'>

export type EmptyDescriptionProps = React.ComponentProps<'p'>

export type EmptyContentProps = React.ComponentProps<'div'>
