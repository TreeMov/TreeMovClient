import type { OTPInput } from 'input-otp'
import type * as React from 'react'

export type InputOTPProps = React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}

export type InputOTPGroupProps = React.ComponentProps<'div'>

export type InputOTPSlotProps = React.ComponentProps<'div'> & {
  index: number
}

export type InputOTPSeparatorProps = React.ComponentProps<'div'>
