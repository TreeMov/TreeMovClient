import type { OrgStepSchema } from '@/modules/auth/types'

export type OrgStepProps = {
  email: string
  password: string
  onNext?: (data: OrgStepSchema) => void
}
