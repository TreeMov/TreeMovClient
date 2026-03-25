import { z } from 'zod'

import {
  periodRefine,
  periodSchema,
  rangeSchema,
} from '../../schemas'

export const schema = z
  .object({
    title: z.string().min(1),
    ...periodSchema.shape,
    ...rangeSchema.shape,
  })
  .superRefine(periodRefine)
