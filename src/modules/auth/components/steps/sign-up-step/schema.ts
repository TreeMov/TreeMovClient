import { z } from 'zod'

export const signUpSchema = z
  .object({
    email: z.email(),
    username: z.string().min(3),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine(
    ({ password, confirmPassword }) => password === confirmPassword,
    { path: ['confirmPassword'], message: 'Passwords do not match' }
  )
