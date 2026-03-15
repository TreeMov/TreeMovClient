import type { CodeStepSchema } from '@/modules/auth/types'

export type CodeStepProps = {
  email: string
  onNext?: (code: CodeStepSchema) => void
}
