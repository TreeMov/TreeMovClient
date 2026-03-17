import type { ScheduleLesson } from '../../types'

export type ScheduleLessonResizerProps = {
  lesson: ScheduleLesson
  onResize?: (isResize: boolean) => void
}
