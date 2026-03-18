import type { ScheduleLesson } from '../../../types'

export type LessonProps = React.ComponentProps<'div'> & {
  isActive?: boolean
  isDrag?: boolean
  isDrop?: boolean
  lesson: ScheduleLesson
}
