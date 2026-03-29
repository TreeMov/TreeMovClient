import type { AlertDialogProps } from '@/components/ui/alert-dialog'
import type { PeriodAlertEnum } from '../types'

export type ScheduleChangePeriodAlertProps = AlertDialogProps & {
  onCancel: () => void
  onSubmit: (value: PeriodAlertEnum) => void
}
