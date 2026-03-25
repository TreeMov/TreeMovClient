import { z } from 'zod'

import { requiredComboboxValue } from '@/utils/helpers/validation'

import {
  periodRefine,
  periodSchema,
  rangeSchema,
} from '../../schemas'

export const baseSchema = z.object({
  subject: requiredComboboxValue,
  teacher: requiredComboboxValue,
  classroom: requiredComboboxValue,
  student_group: requiredComboboxValue,
  comment: z.string(),
})

export const schema = z
  .object({
    ...baseSchema.shape,
    ...periodSchema.shape,
    ...rangeSchema.shape,
  })
  .superRefine(periodRefine)
