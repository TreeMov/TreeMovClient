import type {
  ScheduleEventFormFieldsBase,
  ScheduleLessonFormFieldsBase,
} from './types'

export const dateFormat = 'yyyy-MM-dd'
export const timeFormat = 'HH:mm'
export const fullDateFormat = `${dateFormat} ${timeFormat}`

export const lessonFormFields: (keyof ScheduleLessonFormFieldsBase)[] =
  ['subject', 'teacher', 'classroom', 'student_group', 'comment']

export const eventFormFields: (keyof ScheduleEventFormFieldsBase)[] =
  ['title']
