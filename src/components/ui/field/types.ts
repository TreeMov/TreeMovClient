import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import type { Label } from '@/components/ui/label'
import type { fieldVariants } from './constants'

export type FieldSetProps = React.ComponentProps<'fieldset'>

export type FieldLegendProps = React.ComponentProps<'legend'> & {
  variant?: 'legend' | 'label'
}

export type FieldGroupProps = React.ComponentProps<'div'>

export type FieldProps = React.ComponentProps<'div'> &
  VariantProps<typeof fieldVariants>

export type FieldContentProps = React.ComponentProps<'div'>

export type FieldLabelProps = React.ComponentProps<typeof Label>

export type FieldTitleProps = React.ComponentProps<'div'>

export type FieldDescriptionProps = React.ComponentProps<'p'>

export type FieldSeparatorProps = React.ComponentProps<'div'> & {
  children?: React.ReactNode
}

export type FieldErrorProps = React.ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>
}
