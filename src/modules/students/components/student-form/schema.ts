import { format } from 'date-fns'
import { z } from 'zod'

export const schema = z.object({
  name: z.string(),
  surname: z.string(),
  birthday: z
    .date()
    .transform((value) => format(value, 'yyyy-MM-dd')),
})
