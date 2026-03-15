import type {
  LessonModelCreate,
  LessonModelRead,
} from '@/api/generated/core'
import type {
  ScheduleLesson,
  ScheduleLessonFormFields,
  ScheduleLessonRead,
} from './types'

import { addHours, parse, set, startOfToday } from 'date-fns'

import { getDayHours } from '@/utils/helpers/dates'

import { dateFormat, timeFormat } from './constants'

export const getScheduleHours = () =>
  getDayHours(
    addHours(startOfToday(), 8),
    addHours(startOfToday(), 22)
  )

export const getSerializedTime = (time: string) =>
  time.split(':').slice(0, 2).join(':')

// todo убрать плейсхолдеры
export const serializeLessonFields = ({
  teacher,
  classroom,
  student_group,
  subject,
  comment,
}: Pick<
  LessonModelRead,
  keyof ScheduleLessonFormFields
>): ScheduleLessonFormFields => ({
  teacher: { id: teacher.id, label: teacher.employee.name ?? '' },
  classroom: { id: classroom.id, label: classroom.title },
  student_group: { id: student_group.id, label: student_group.title },
  subject: { id: subject.id, label: subject.title },
  comment: comment ?? '',
})

export const serializeLesson = ({
  start_time,
  end_time,
  ...lesson
}: LessonModelRead): ScheduleLessonRead => ({
  ...lesson,
  type: 'read',
  start_time: getSerializedTime(start_time),
  end_time: getSerializedTime(end_time),
  ...serializeLessonFields(lesson),
})

// todo убрать плейсхолдеры
export const deserealizeLesson = ({
  teacher,
  classroom,
  student_group,
  subject,
  ...lesson
}: ScheduleLesson): LessonModelCreate => ({
  ...lesson,
  teacher_id: teacher?.id ?? 0,
  classroom_id: classroom?.id ?? 0,
  student_group_id: student_group?.id ?? 0,
  subject_id: subject?.id ?? 0,
})

export const timeToDate = (time: string) => {
  const timeToParse = getSerializedTime(time)
  return parse(timeToParse, timeFormat, new Date())
}

export const combineDateAndTime = (date: string, time: string) => {
  const parsedDate = parse(date, dateFormat, new Date())
  const parsedTime = timeToDate(time)

  return set(parsedDate, {
    hours: parsedTime.getHours(),
    minutes: parsedTime.getMinutes(),
    seconds: parsedTime.getSeconds(),
  })
}
