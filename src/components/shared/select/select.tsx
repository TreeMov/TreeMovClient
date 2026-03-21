import type { SelectFormProps } from './types'

import { type FieldPath, type FieldValues } from 'react-hook-form'

import { Select as USelect } from '@/components/ui/select'

import { FormWrapper } from '../form-wrapper'

export const Select = <
  Values extends string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  ...props
}: SelectFormProps<Values, TFieldValues, TName>) => {
  return (
    <FormWrapper {...props}>
      {({ field }) => (
        <USelect
          {...inputProps}
          {...field}
          onValueChange={field.onChange}
        />
      )}
    </FormWrapper>
  )
}
