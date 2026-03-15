import type { CodeResendProps } from './types'

import { format } from 'date-fns'
import React from 'react'

import { useCountdown } from '@/hooks/use-countdown'

export const CodeResend: React.FC<CodeResendProps> = ({
  isLoading,
  onResend,
}) => {
  const { value, retry } = useCountdown(60, {})
  const formattedValue = format(value * 1000, 'mm:ss')

  const disabled = value > 0

  const handleResend = async () => {
    await onResend()
    retry()
  }

  return (
    <div className="flex flex-col items-center gap-2.5">
      <button
        disabled={disabled || isLoading}
        className="disabled:text-grey-200 text-lg text-violet-700 not-disabled:cursor-pointer not-disabled:hover:underline"
        onClick={handleResend}
      >
        Отправить код повторно
      </button>
      {disabled && (
        <span className="text-grey-500 text-lg">
          {formattedValue}
        </span>
      )}
    </div>
  )
}
