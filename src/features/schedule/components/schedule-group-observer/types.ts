import type { ScheduleEvent } from '../../types'

export type ScheduleGroupObserverProps = {
  events: ScheduleEvent[]
  event: ScheduleEvent
  children: (group: number) => React.ReactNode
}
