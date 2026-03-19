import type { ScheduleEvent } from '../../../types'

export type EventProps = React.ComponentProps<'div'> & {
  event: ScheduleEvent
  group?: number
  isActive?: boolean
  isDrag?: boolean
  isDrop?: boolean
}
