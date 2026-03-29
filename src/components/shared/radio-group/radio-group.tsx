import type { RadioGroupFormProps } from './types'

import { type FieldPath, type FieldValues } from 'react-hook-form'

import { RadioGroup as URadioGroup } from '@/components/ui/radio-group'

import { FormWrapper } from '../form-wrapper'

export const RadioGroup = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  ...props
}: RadioGroupFormProps<TFieldValues, TName>) => {
  return (
    <FormWrapper {...props}>
      {({ field }) => <URadioGroup {...inputProps} {...field} />}
    </FormWrapper>
  )
}
