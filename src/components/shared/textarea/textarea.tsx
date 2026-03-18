import type { TextareaFormProps } from './types'

import { type FieldPath, type FieldValues } from 'react-hook-form'

import { Textarea as UTextarea } from '@/components/ui/textarea'

import { FormWrapper } from '../form-wrapper'

export const Textarea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  ...props
}: TextareaFormProps<TFieldValues, TName>) => {
  return (
    <FormWrapper {...props}>
      {({ field }) => <UTextarea {...inputProps} {...field} />}
    </FormWrapper>
  )
}
