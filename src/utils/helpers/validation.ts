import { z } from 'zod'

export const requiredComboboxValue = z
  .string()
  .nullable()
  .transform((value, ctx) => {
    if (value === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Поле обязательно',
      })
      return z.NEVER
    }

    return value
  })
