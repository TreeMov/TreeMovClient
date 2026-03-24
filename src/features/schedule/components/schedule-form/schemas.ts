import type { DateRange } from 'react-day-picker'
import type { NonUndefinedFields } from '@/types/utility'
import type {
  PeriodEnum,
  PeriodSchema,
  PeriodSchemaOutput,
} from './types'

import { format } from 'date-fns'
import { z } from 'zod'

import { dateFormat } from '../../constants'

export const periodSchema = z.object({
  period: z.custom<PeriodEnum>().nullable().optional(),
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

export const periodRefine = (
  { period, periodDateRange }: PeriodSchemaOutput,
  ctx: z.core.$RefinementCtx<PeriodSchema>
) => {
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
}
