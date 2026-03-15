import type { Label as LabelPrimitive, Slot } from 'radix-ui'
import type * as React from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

export type FormItemContextValue = {
  id: string
}

export type FormItemProps = React.ComponentProps<'div'>
export type FormLabelProps = React.ComponentProps<
  typeof LabelPrimitive.Root
> & { label?: string; isRequired?: boolean }
export type FormControlProps = React.ComponentProps<typeof Slot.Root>
export type FormDescriptionProps = React.ComponentProps<'p'>
export type FormMessageProps = React.ComponentProps<'p'>
