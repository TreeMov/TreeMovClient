import type { RadioGroupProps } from '@/components/ui/radio-group'
import type { BaseInputFormProps } from '@/types/form'

import { type FieldPath, type FieldValues } from 'react-hook-form'

export type RadioGroupFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseInputFormProps<TFieldValues, TName> & {
  inputProps: RadioGroupProps
}
