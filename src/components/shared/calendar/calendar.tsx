import type { CalendarFormProps } from './types'

import { omit } from 'lodash-es'
import { type FieldPath, type FieldValues } from 'react-hook-form'

import { Calendar as UCalendar } from '@/components/ui/calendar'

import { FormWrapper } from '../form-wrapper'

export const Calendar = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  ...props
}: CalendarFormProps<TFieldValues, TName>) => {
  return (
    <FormWrapper {...props}>
      {({ field }) => (
        <UCalendar
          {...inputProps}
          {...omit(field, ['onChange'])}
          mode={inputProps.mode ?? 'single'}
          selected={field.value}
          onSelect={field.onChange}
        />
      )}
    </FormWrapper>
  )
}
