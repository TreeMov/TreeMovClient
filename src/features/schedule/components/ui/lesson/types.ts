import type { ScheduleLesson } from '../../../types'

export type LessonProps = React.ComponentProps<'div'> & {
  lesson: ScheduleLesson
  group?: number
  isActive?: boolean
  isDrag?: boolean
  isDrop?: boolean
}
