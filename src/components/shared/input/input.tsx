import type { InputFormProps } from './types'

import { type FieldPath, type FieldValues } from 'react-hook-form'

import { Input as UInput } from '@/components/ui/input'

import { FormWrapper } from '../form-wrapper'

export const Input = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  ...props
}: InputFormProps<TFieldValues, TName>) => {
  return (
    <FormWrapper {...props}>
      <UInput {...inputProps} />
    </FormWrapper>
  )
}
