import type { SignInStepSchema } from '../../types'

export type SignInSchema = SignInStepSchema

export type SignInSteps = 'sign-in'

export type FormValuesContextType = SignInSchema & {
  setFormValues: React.Dispatch<React.SetStateAction<SignInSchema>>
}
