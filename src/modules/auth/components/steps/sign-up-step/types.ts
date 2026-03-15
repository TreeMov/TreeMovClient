import type { SignUpStepSchema } from '@/modules/auth/types'

export type SignUpStepProps = {
  onNext: (data: SignUpStepSchema) => void
}
