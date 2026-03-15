import type { FieldPath, FieldValues } from 'react-hook-form'
import type { BaseInputFormProps } from '@/types/form'

export type FormWrapperProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseInputFormProps<TFieldValues, TName>
