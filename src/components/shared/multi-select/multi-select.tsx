import type { MultiSelectFormProps } from './types'

import { type FieldPath, type FieldValues } from 'react-hook-form'

import { MultiSelect as UMultiSelect } from '@/components/ui/multi-select'

import { FormWrapper } from '../form-wrapper'

export const MultiSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  ...props
}: MultiSelectFormProps<TFieldValues, TName>) => {
  return (
    <FormWrapper {...props}>
      {({ field }) => <UMultiSelect {...inputProps} {...field} />}
    </FormWrapper>
  )
}
