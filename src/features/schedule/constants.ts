import type {
  SerializedEventFieldsKeys,
  SerializedLessonFieldsKeys,
  SeriazliedEventCommonFieldsKeys,
} from './types'

export const dateFormat = 'yyyy-MM-dd'
export const timeFormat = 'HH:mm'
export const fullDateFormat = `${dateFormat} ${timeFormat}`

export const formCommonFields: SeriazliedEventCommonFieldsKeys[] = [
  'comment',
]

export const lessonFormFields: SerializedLessonFieldsKeys[] = [
  'subject',
  'teacher',
  'classroom',
  'student_group',
  'comment',
]

export const eventFormFields: SerializedEventFieldsKeys[] = [
  'title',
  'comment',
]
