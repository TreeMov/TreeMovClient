import type { CalendarProps } from '@/components/ui/calendar'
import type { BaseInputFormProps } from '@/types/form'

import { type FieldPath, type FieldValues } from 'react-hook-form'

export type CalendarFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseInputFormProps<TFieldValues, TName> & {
  inputProps: Omit<CalendarProps, 'onSelect'>
}
