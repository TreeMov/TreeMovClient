import type { AlertDialogProps } from '@/components/ui/alert-dialog'
import type { PeriodAlertEnum } from '../types'

export type ScheduleDeletePeriodAlertProps = AlertDialogProps & {
  onSubmit: (value: PeriodAlertEnum) => void
}
