import type { InputOTPProps } from '@/components/ui/input-otp'
import type { BaseInputFormProps } from '@/types/form'

import { type FieldPath, type FieldValues } from 'react-hook-form'

export type InputOtpFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseInputFormProps<TFieldValues, TName> & {
  inputProps: Omit<InputOTPProps, 'children' | 'render'>
}
