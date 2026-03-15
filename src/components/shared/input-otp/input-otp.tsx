import type { FieldPath, FieldValues } from 'react-hook-form'
import type { InputOtpFormProps } from './types'

import { InputOTP } from '@/components/ui/input-otp'

import { FormWrapper } from '../form-wrapper'

export const InputOtp = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  children,
  ...props
}: React.PropsWithChildren<
  InputOtpFormProps<TFieldValues, TName>
>) => {
  return (
    <FormWrapper {...props}>
      <InputOTP {...inputProps}>{children}</InputOTP>
    </FormWrapper>
  )
}
