import { z } from 'zod'

export const orgSchema = z.object({
  organization: z.string(),
})
