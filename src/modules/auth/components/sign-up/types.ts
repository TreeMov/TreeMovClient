import type { CodeStepSchema, SignUpStepSchema } from '../../types'

export type SignUpSchema = SignUpStepSchema & CodeStepSchema

export type SignUpSteps = 'sign-up' | 'code'

export type FormValuesContextType = SignUpSchema & {
  setFormValues: React.Dispatch<React.SetStateAction<SignUpSchema>>
}
