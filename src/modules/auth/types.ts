import type z from 'zod'
import type {
  codeSchema,
  orgSchema,
  signInSchema,
  signUpSchema,
} from './components/steps'

export type SignInStepSchema = z.infer<typeof signInSchema>
export type SignUpStepSchema = z.infer<typeof signUpSchema>
export type CodeStepSchema = z.infer<typeof codeSchema>
export type OrgStepSchema = z.infer<typeof orgSchema>
