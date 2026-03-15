import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import type { Separator } from '@/components/ui/separator'
import type { itemMediaVariants, itemVariants } from './constants'

export type ItemGroupProps = React.ComponentProps<'div'>

export type ItemSeparatorProps = React.ComponentProps<
  typeof Separator
>

export type ItemProps = React.ComponentProps<'div'> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }

export type ItemMediaProps = React.ComponentProps<'div'> &
  VariantProps<typeof itemMediaVariants>

export type ItemContentProps = React.ComponentProps<'div'>

export type ItemTitleProps = React.ComponentProps<'div'>

export type ItemDescriptionProps = React.ComponentProps<'p'>

export type ItemActionsProps = React.ComponentProps<'div'>

export type ItemHeaderProps = React.ComponentProps<'div'>

export type ItemFooterProps = React.ComponentProps<'div'>
