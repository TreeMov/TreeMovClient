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

export type ScheduleFormFieldsBase = {
  comment: string
}

export type ScheduleFormFieldsBaseKeys = keyof ScheduleFormFieldsBase

export type ScheduleLessonFormFieldsBase = ScheduleFormFieldsBase & {
  subject: ScheduleField
  teacher: ScheduleField
  classroom: ScheduleField
  student_group: ScheduleField
}

export type ScheduleLessonFormFields = ScheduleFormBase &
  ScheduleLessonFormFieldsBase & {
    formType: 'lesson'
  }

export type ScheduleEventFormFieldsBase = ScheduleFormFieldsBase & {
  title: string
}

export type ScheduleEventFormFields = ScheduleFormBase &
  ScheduleEventFormFieldsBase & {
    formType: 'event'
  }

export type ScheduleEventFields = Prettify<
  (ScheduleLessonFormFields | ScheduleEventFormFields) &
    ScheduleEventBaseFields & {
      is_completed: boolean
      is_canceled: boolean
      period_lesson_id?: number | null
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
  onChangePeriod: (periodId: number) => MaybePromise<void>
  onDeletePeriod: (periodId: number) => MaybePromise<void>
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

export type OnCreatePeriodHandlerParams = {
  id: number
  dto: ScheduleEventRead
  period: PeriodEnum
  range: PeriodRange
}

export type ScheduleContextType = ScheduleProps & {
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
  // todo доделать
  onChangePeriodHandler: (
    eventId: number,
    periodId: number,
    prevData: ScheduleEvent
  ) => MaybePromise<void>
  // todo доделать
  onDeletePeriodHandler: (periodId: number) => MaybePromise<void>
}

export type ScheduleStoreContextType = Pick<
  ScheduleContextType,
  'store' | 'contentRef'
>

export type ScheduleCalendarContextType = Pick<
  ScheduleContextType,
  'config' | 'view' | 'days' | 'selectedDate' | 'onClickCell'
>

export type ScheduleTimeContextType = Pick<
  ScheduleContextType,
  'hours' | 'startHour' | 'endHour'
> & {
  segmentSize: ScheduleContextType['config']['segmentSize']
}

export type ScheduleStatusContextType = Pick<
  ScheduleContextType,
  'isLoading'
>

export type ScheduleActionsContextType = Pick<
  ScheduleContextType,
  | 'onChange'
  | 'onDelete'
  | 'onCreate'
  | 'onCreatePeriod'
  | 'onChangePeriod'
  | 'onDeletePeriod'
  | 'onChangeHandler'
  | 'onDeleteHandler'
  | 'onCreateHandler'
  | 'onCreatePeriodHandler'
  | 'onChangePeriodHandler'
  | 'onDeletePeriodHandler'
>

export type ScheduleEventsContextType = Pick<
  ScheduleContextType,
  'events'
>

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

export type SerializedFields = Prettify<
  Pick<
    LessonModelRead,
    keyof (ScheduleLessonFormFieldsBase & ScheduleEventFormFieldsBase)
  >
>

export type SeriazliedEventCommonFieldsKeys = keyof Pick<
  SerializedFields,
  'comment'
>

export type SerializedLessonFieldsKeys = keyof Pick<
  SerializedFields,
  'subject' | 'classroom' | 'teacher' | 'student_group' | 'comment'
>

export type SerializedEventFieldsKeys = keyof Pick<
  SerializedFields,
  'title' | 'comment'
>

export type SerializedLessonFields = Prettify<
  Pick<SerializedFields, SerializedLessonFieldsKeys> &
    Pick<SerializedFields, SeriazliedEventCommonFieldsKeys>
>

export type Req = NonNullableFields<Required<SerializedLessonFields>>

export type SerializedEventFields = Prettify<
  Pick<SerializedFields, SerializedEventFieldsKeys> &
    Pick<SerializedFields, SeriazliedEventCommonFieldsKeys>
>
