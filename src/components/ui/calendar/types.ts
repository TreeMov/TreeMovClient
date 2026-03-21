import type * as React from 'react'
import type { DayButton, DayPickerProps } from 'react-day-picker'
import type { Button } from '@/components/ui/button'

export type CalendarProps = DayPickerProps & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
  placeholder?: string
}

export type CalendarDayButtonProps = React.ComponentProps<
  typeof DayButton
>
