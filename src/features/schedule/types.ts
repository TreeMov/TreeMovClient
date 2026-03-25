import type { RefObject } from 'react'
import type {
  LessonModelCreate,
  LessonModelRead,
  LessonModelUpdate,
  PeriodLessonModelCreate,
} from '@/api/generated/core'
import type {
  MaybePromise,
  NonNullableFields,
  Prettify,
} from '@/types/utility'
import type { PeriodEnum } from './components/ui/form'
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

export type ScheduleProps = {
  config: ScheduleConfig
  events: LessonModelRead[]
  selectedDate: Date
  isLoading?: boolean
  view?: ScheduleView
  startHour?: number
  endHour?: number
  onChange: (id: number, dto: LessonModelUpdate) => MaybePromise<void>
  onDelete: (id: number) => MaybePromise<void>
  onCreate: (dto: LessonModelCreate) => MaybePromise<void>
  onCreatePeriod: (
    dto: Omit<PeriodLessonModelCreate, 'period'>,
    period: PeriodEnum
  ) => MaybePromise<void>
  onClickCell?: (date: Date) => void
}

export type PeriodRange = {
  from: string
  to: string
}

export type OnChangeHandlerParams = {
  dto: ScheduleEventRead
  prevData: ScheduleEvent
}

export type ScheduleContextType = Omit<
  ScheduleProps,
  'onChange' | 'onDelete' | 'onCreate' | 'onCreatePeriod'
> & {
  store: Store
  contentRef: RefObject<HTMLDivElement | null>
  days: Date[]
  hours: Date[]
  onChangeHandler: (params: OnChangeHandlerParams) => Promise<void>
  onDeleteHandler: (
    id: number,
    type: ScheduleEventType
  ) => Promise<void>
  onCreateHandler: (dto: ScheduleEventRead) => Promise<void>
  onCreatePeriodHandler: (
    id: number,
    dto: ScheduleEventRead,
    period: PeriodEnum,
    range: PeriodRange
  ) => MaybePromise<void>
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

export type DeserializedEvent = (
  | DeserializedLessonFields
  | DeserializedEventFields
) & {
  is_canceled: boolean
  is_completed: boolean
}

export type SeriazliedEventCommonFieldsKeys = keyof Pick<
  SerializedFields,
  'comment'
>

export type SerializedLessonFieldsKeys = keyof Pick<
  SerializedFields,
  'subject' | 'classroom' | 'teacher' | 'student_group'
>

export type SerializedEventFieldsKeys = keyof Pick<
  SerializedFields,
  'title'
>

export type SerializedFields = Pick<
  LessonModelRead,
  keyof (ScheduleLessonFormFieldsBase & ScheduleEventFormFieldsBase)
>

export type SerializedLessonFields = Prettify<
  NonNullableFields<
    Pick<SerializedFields, SerializedLessonFieldsKeys>
  > &
    Pick<SerializedFields, SeriazliedEventCommonFieldsKeys>
>

export type SerializedEventFields = Prettify<
  NonNullableFields<
    Pick<SerializedFields, SerializedEventFieldsKeys>
  > &
    Pick<SerializedFields, SeriazliedEventCommonFieldsKeys>
>
