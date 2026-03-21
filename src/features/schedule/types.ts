import type { RefObject } from 'react'
import type {
  LessonModelCreate,
  LessonModelRead,
} from '@/api/generated/core'
import type { Prettify } from '@/types/utility'
import type { Store } from './store'

export type ScheduleConfig = {
  dayFormat: string
  segmentSize: number
}

export type ScheduleView = 'day' | 'week' | 'month'

export type ScheduleFormType = 'lesson' | 'event'
export type ScheduleChangeType = 'create' | 'update'
export type ScheduleEventType = 'create' | 'read'
export type ScheduleEventState =
  | 'normal'
  | 'resize'
  | 'drag'
  | 'active'

export type ScheduleEventBaseFields = {
  id: number
  start_time: string
  end_time: string
  date: string
  color: string
  state: ScheduleEventState
}

export type ScheduleField = {
  id: number
  label: string
}

export type ScheduleFormBase = {
  formType: ScheduleFormType
}

export type ScheduleLessonFormFieldsBase = {
  subject: ScheduleField
  teacher: ScheduleField
  classroom: ScheduleField
  student_group: ScheduleField
  comment: string
}

export type ScheduleLessonFormFields = ScheduleFormBase &
  ScheduleLessonFormFieldsBase & {
    formType: 'lesson'
  }

export type ScheduleEventFormFieldsBase = { title: string }

export type ScheduleEventFormFields = ScheduleFormBase &
  ScheduleEventFormFieldsBase & {
    formType: 'event'
  }

export type ScheduleEventFields = Prettify<
  (ScheduleLessonFormFields | ScheduleEventFormFields) &
    ScheduleEventBaseFields & {
      is_completed: boolean
      is_canceled: boolean
    }
>

export type ScheduleEventBase = ScheduleEventFields & {
  type: ScheduleEventType
}

export type ScheduleEventCreate = ScheduleEventBaseFields & {
  type: 'create'
}

export type ScheduleEventRead = ScheduleEventBase & {
  type: 'read'
}

export type ScheduleEvent = ScheduleEventCreate | ScheduleEventRead

export type OnChangeParams = {
  type: ScheduleChangeType
  dto: ScheduleEventRead
}

export type OnDeleteParams = {
  type: ScheduleChangeType
  id: number
}

export type ScheduleProps = {
  config: ScheduleConfig
  events: LessonModelRead[]
  days: Date[]
  hours: Date[]
  isLoading?: boolean
  view?: ScheduleView
  onChange: (
    params: OnChangeParams
  ) => Promise<LessonModelRead[] | undefined>
  onDelete: (
    params: OnDeleteParams
  ) => Promise<LessonModelRead[] | undefined>
}

export type OnChangeHandlerParams = OnChangeParams & {
  prevData: ScheduleEvent
}

export type ScheduleContextType = Omit<
  ScheduleProps,
  'onChange' | 'onDelete'
> & {
  store: Store
  contentRef: RefObject<HTMLDivElement | null>
  onChangeHandler: (params: OnChangeHandlerParams) => Promise<void>
  onDeleteHandler: (params: OnDeleteParams) => Promise<void>
}

export type Direction = 'down' | 'up'

export type DeserializedLessonFieldsKeys = keyof Pick<
  LessonModelCreate,
  'subject_id' | 'teacher_id' | 'classroom_id' | 'student_group_id'
>
export type DeserializedLessonFields = Prettify<
  Omit<LessonModelCreate, DeserializedLessonFieldsKeys> &
    Pick<Required<LessonModelCreate>, DeserializedLessonFieldsKeys>
>

export type DeserializedEventFieldsKeys = keyof Pick<
  LessonModelCreate,
  'title'
>
export type DeserializedEventFields = Prettify<
  Omit<LessonModelCreate, DeserializedEventFieldsKeys> &
    Pick<Required<LessonModelCreate>, DeserializedEventFieldsKeys>
>

export type DeserializedEvent =
  | DeserializedLessonFields
  | DeserializedEventFields
