import type { DateRange } from 'react-day-picker'
import type { NonUndefinedFields } from '@/types/utility'

import { format } from 'date-fns'
import { z } from 'zod'

import { dateFormat } from '@/features/schedule/constants'
import { requiredComboboxValue } from '@/utils/helpers/validation'

export const baseSchema = z.object({
  subject: requiredComboboxValue,
  teacher: requiredComboboxValue,
  classroom: requiredComboboxValue,
  student_group: requiredComboboxValue,
  comment: z.string().min(1),
})

export const schema = z
  .object({
    ...baseSchema.shape,
    period: z.string().nullable().optional(),
    periodDateRange: z
      .custom<Required<NonUndefinedFields<DateRange>>>()
      .nullable()
      .optional()
      .transform((val) => {
        if (!val) {
          return val
        }

        return {
          from: format(val.from, dateFormat),
          to: format(val.to, dateFormat),
        }
      }),
  })
  .superRefine(({ period, periodDateRange }, ctx) => {
    const hasPeriod = Boolean(period)
    const hasPeriodDateRange = Boolean(
      periodDateRange?.from || periodDateRange?.to
    )

    if (hasPeriod && !hasPeriodDateRange) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Поле обязательно',
        path: ['periodDateRange'],
      })
    }

    if (!hasPeriod && hasPeriodDateRange) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Поле обязательно',
        path: ['period'],
      })
    }
  })
