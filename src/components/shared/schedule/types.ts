import type { LessonModelRead } from '@/api/generated/core'
import type { Store } from './store'

export type ScheduleConfig = {
  dayFormat: string
  segmentSize: number
}

export type ScheduleProps = {
  config: ScheduleConfig
  lessons: LessonModelRead[]
  onChange?: (
    data: LessonModelRead
  ) => Promise<LessonModelRead[] | undefined>
}

export type ScheduleContextType = Omit<ScheduleProps, 'onChange'> & {
  store: Store
  contentRef: React.RefObject<HTMLDivElement | null>
  onChangeHandler: (
    id: number,
    data: LessonModelRead,
    prevData: LessonModelRead
  ) => void
}

export type Direction = 'down' | 'up'
