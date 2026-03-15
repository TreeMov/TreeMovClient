import type {
  CodeStepSchema,
  OrgStepSchema,
  SignUpStepSchema,
} from '../../types'

export type SignUpSchema = SignUpStepSchema &
  CodeStepSchema &
  OrgStepSchema

export type SignUpSteps = 'sign-up' | 'code' | 'org'

export type FormValuesContextType = SignUpSchema & {
  setFormValues: React.Dispatch<React.SetStateAction<SignUpSchema>>
}
