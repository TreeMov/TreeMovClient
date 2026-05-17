import type { SingleSelectFormProps } from './types'

import { type FieldPath, type FieldValues } from 'react-hook-form'

import { SingleSelect as USingleSelect } from '@/components/ui/single-select'

import { FormWrapper } from '../form-wrapper'

export const SingleSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  ...props
}: SingleSelectFormProps<TFieldValues, TName>) => {
  return (
    <FormWrapper {...props}>
      {({ field }) => <USingleSelect {...inputProps} {...field} />}
    </FormWrapper>
  )
}
