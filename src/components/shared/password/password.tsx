import type { PasswordFormProps } from './types'

import { type FieldPath, type FieldValues } from 'react-hook-form'

import { Password as UPassword } from '@/components/ui/password'

import { FormWrapper } from '../form-wrapper'

export const Password = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  ...props
}: PasswordFormProps<TFieldValues, TName>) => {
  return (
    <FormWrapper {...props}>
      <UPassword {...inputProps} />
    </FormWrapper>
  )
}
