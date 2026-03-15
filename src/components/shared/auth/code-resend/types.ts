import type { MaybePromise } from '@/types/utility'

export type CodeResendProps = {
  isLoading?: boolean
  onResend: () => MaybePromise<unknown>
}
