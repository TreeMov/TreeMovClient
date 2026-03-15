import type { InputProps } from '@/components/ui/input'
import type { BaseInputFormProps } from '@/types/form'

import { type FieldPath, type FieldValues } from 'react-hook-form'

export type InputFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseInputFormProps<TFieldValues, TName> & {
  inputProps: InputProps
}
