import { z } from 'zod'

import { periodRefine, periodSchema } from '../../schemas'

export const schema = z
  .object({
    title: z.string().min(1),
    ...periodSchema.shape,
  })
  .superRefine(periodRefine)
