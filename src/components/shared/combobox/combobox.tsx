import type { ComboboxFormProps } from './types'

import { type FieldPath, type FieldValues } from 'react-hook-form'

import { Combobox as UCombobox } from '@/components/ui/combobox'

import { FormWrapper } from '../form-wrapper'

export const Combobox = <
  Values extends string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  ...props
}: ComboboxFormProps<Values, TFieldValues, TName>) => {
  return (
    <FormWrapper {...props}>
      {({ field }) => (
        <UCombobox
          {...inputProps}
          {...field}
          onValueChange={field.onChange}
        />
      )}
    </FormWrapper>
  )
}
