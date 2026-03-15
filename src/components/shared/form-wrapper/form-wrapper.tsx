import type { FieldPath, FieldValues } from 'react-hook-form'
import type { FormWrapperProps } from './types'

import { Slot } from 'radix-ui'
import React from 'react'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

export const FormWrapper = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  children,
  control,
  controllerProps,
  label,
  isRequired,
  description,
  name,
}: React.PropsWithChildren<
  FormWrapperProps<TFieldValues, TName>
>) => {
  return (
    <FormField
      name={name}
      control={control}
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            isRequired={isRequired}
            aria-required={isRequired}
            label={label}
          />
          <FormControl>
            <Slot.Root {...field}>{children}</Slot.Root>
          </FormControl>
          {description && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
