import type { ScheduleLesson } from '../../types'

export type ScheduleGroupObserverProps = {
  lessons: ScheduleLesson[]
  lesson: ScheduleLesson
  children: (group: number) => React.ReactNode
}
