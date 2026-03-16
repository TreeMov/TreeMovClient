import type { LessonModelRead } from '@/api/generated/core'
import type { Prettify, UndefinedFields } from '@/types/utility'
import type { Store } from './store'

export type ScheduleConfig = {
  dayFormat: string
  segmentSize: number
}

export type ScheduleLessonType = 'drag' | 'resize' | 'create' | 'read'

export type ScheduleField = {
  id: number
  label: string
}

export type ScheduleLessonFormFields = {
  comment: string
  teacher: ScheduleField
  classroom: ScheduleField
  student_group: ScheduleField
  subject: ScheduleField
}

export type ScheduleLessonFields = Prettify<
  UndefinedFields<ScheduleLessonFormFields> & {
    id: number
    title: string
    start_time: string
    end_time: string
    date: string
    is_canceled: boolean
    is_completed: boolean
    color: string
  }
>

export type ScheduleLessonBase = ScheduleLessonFields & {
  type: ScheduleLessonType
}

export type ScheduleLessonCreate = ScheduleLessonBase & {
  type: 'create'
}

export type ScheduleLessonRead = ScheduleLessonBase & {
  type: 'read'
}

export type ScheduleLessonDrag = ScheduleLessonBase & {
  type: 'drag'
}

export type ScheduleLessonResize = ScheduleLessonBase & {
  type: 'resize'
}

export type ScheduleLesson =
  | ScheduleLessonDrag
  | ScheduleLessonCreate
  | ScheduleLessonRead
  | ScheduleLessonResize

export type ScheduleProps = {
  config: ScheduleConfig
  lessons: LessonModelRead[]
  days: Date[]
  hours: Date[]
  onChange: (
    data: ScheduleLesson
  ) => Promise<LessonModelRead[] | undefined>
}

export type ScheduleContextType = Omit<ScheduleProps, 'onChange'> & {
  store: Store
  contentRef: React.RefObject<HTMLDivElement | null>

  onChangeHandler: (
    id: number,
    data: ScheduleLesson,
    prevData?: ScheduleLesson
  ) => Promise<void>
}

export type Direction = 'down' | 'up'
