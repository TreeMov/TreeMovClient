import type { useSchedule } from '../../hooks'
import type { ScheduleEvent } from '../../types'

export type FormActions = Pick<
  ReturnType<typeof useSchedule>,
  'onCreatePeriodHandler' | 'onCreateHandler' | 'onChangeHandler'
>

export type FormProps = ScheduleEvent &
  FormActions & {
    onClose: () => void
  }
