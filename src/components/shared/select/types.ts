import type { SelectProps } from '@/components/ui/select/types'
import type { BaseInputFormProps } from '@/types/form'

import { type FieldPath, type FieldValues } from 'react-hook-form'

export type SelectFormProps<
  Values extends string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseInputFormProps<TFieldValues, TName> & {
  inputProps: SelectProps<Values>
}
