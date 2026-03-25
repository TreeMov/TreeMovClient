import type { ScheduleEvent } from '@/features/schedule/types'

export type EventCardProps = React.ComponentProps<'div'> & {
  event: ScheduleEvent
  isActive?: boolean
  isDrag?: boolean
  isDrop?: boolean
}
