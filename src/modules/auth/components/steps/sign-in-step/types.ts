import type { SignInStepSchema } from '@/modules/auth/types'

export type SignInStepProps = {
  onNext: (data: SignInStepSchema) => void
}
