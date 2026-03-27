import type { CodeStepSchema } from '@/modules/auth/types'

export type CodeStepProps = {
  password: string
  email: string
  onNext?: (code: CodeStepSchema) => void
}
