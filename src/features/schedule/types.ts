import type { LessonModelRead } from '@/api/generated/core'
import type { Prettify } from '@/types/utility'
import type { Store } from './store'

export type ScheduleConfig = {
  dayFormat: string
  segmentSize: number
}

export type ScheduleLessonType = 'create' | 'read'
export type ScheduleLessonState =
  | 'normal'
  | 'resize'
  | 'drag'
  | 'drag-overlay'
  | 'active'

export type ScheduleLessonBaseFields = {
  id: number
  start_time: string
  end_time: string
  date: string
  color: string
  state: ScheduleLessonState
}

export type ScheduleField = {
  id: number
  label: string
}

export type ScheduleLessonFormFields = {
  subject: ScheduleField
  teacher: ScheduleField
  classroom: ScheduleField
  student_group: ScheduleField
  comment: string
}

export type ScheduleLessonFields = Prettify<
  ScheduleLessonFormFields &
    ScheduleLessonBaseFields & {
      title: string
      is_completed: boolean
      is_canceled: boolean
    }
>

export type ScheduleLessonBase = ScheduleLessonFields & {
  type: ScheduleLessonType
}

export type ScheduleLessonCreate = ScheduleLessonBaseFields & {
  type: 'create'
}

export type ScheduleLessonRead = ScheduleLessonBase & {
  type: 'read'
}

export type ScheduleLesson = ScheduleLessonCreate | ScheduleLessonRead

export type OnChangeParams = {
  type: ScheduleLessonType
  dto: ScheduleLessonRead
}

export type ScheduleProps = {
  config: ScheduleConfig
  lessons: LessonModelRead[]
  days: Date[]
  hours: Date[]
  isLoading?: boolean
  onChange: (
    params: OnChangeParams
  ) => Promise<LessonModelRead[] | undefined>
}

export type OnChangeHandlerParams = OnChangeParams & {
  prevData: ScheduleLesson
}

export type ScheduleContextType = Omit<ScheduleProps, 'onChange'> & {
  store: Store
  contentRef: React.RefObject<HTMLDivElement | null>
  onChangeHandler: (params: OnChangeHandlerParams) => Promise<void>
}

export type Direction = 'down' | 'up'
