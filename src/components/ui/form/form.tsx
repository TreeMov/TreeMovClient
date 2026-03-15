import type {
  FormControlProps,
  FormDescriptionProps,
  FormItemProps,
  FormLabelProps,
  FormMessageProps,
} from './types'

import { Slot } from 'radix-ui'
import * as React from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
} from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { cn } from '@/utils/helpers//shadcn'

import { FormFieldContext, FormItemContext } from './context'
import { useFormField } from './hooks'

const Form = FormProvider

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const FormItem: React.FC<FormItemProps> = ({
  className,
  ...props
}) => {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('grid gap-2', className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

const FormLabel: React.FC<FormLabelProps> = ({
  className,
  label,
  isRequired,
  ...props
}) => {
  const { error, formItemId } = useFormField()

  if (!label) {
    return null
  }

  return (
    <div className="flex gap-0.5">
      <Label
        data-slot="form-label"
        data-error={!!error}
        className={cn(
          'data-[error=true]:text-destructive',
          className
        )}
        htmlFor={formItemId}
        {...props}
      >
        {label}
      </Label>
      {isRequired && <span className="text-sm text-red-600">*</span>}
    </div>
  )
}

const FormControl: React.FC<FormControlProps> = ({ ...props }) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField()
  return (
    <Slot.Root
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

const FormDescription: React.FC<FormDescriptionProps> = ({
  className,
  ...props
}) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

const FormMessage: React.FC<FormMessageProps> = ({
  className,
  ...props
}) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? '') : props.children
  if (!body) {
    return null
  }
  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
  FormField,
}
