import type { LessonModelRead } from '@/api/generated/core'
import type {
  DeserializedEvent,
  ScheduleEventFormFields,
  ScheduleEventFormFieldsBase,
  ScheduleEventRead,
  ScheduleLessonFormFields,
  ScheduleLessonFormFieldsBase,
} from './types'

import { addHours, format, parse, set, startOfToday } from 'date-fns'
import { every, has, omit } from 'lodash-es'

import { getDayHours } from '@/utils/helpers/dates'

import {
  dateFormat,
  eventFormFields,
  lessonFormFields,
  timeFormat,
} from './constants'

export const getScheduleHours = () =>
  getDayHours(
    addHours(startOfToday(), 8),
    addHours(startOfToday(), 20)
  )

export const getSerializedTime = (time: string) =>
  time.split(':').slice(0, 2).join(':')

export const serializeEventsFields = (
  fields: Pick<
    LessonModelRead,
    keyof (ScheduleLessonFormFieldsBase & ScheduleEventFormFieldsBase)
  >
): ScheduleLessonFormFields | ScheduleEventFormFields => {
  const isLessonForm = every(lessonFormFields, (key) =>
    has(fields, key)
  )

  const {
    subject,
    teacher,
    classroom,
    student_group,
    title,
    comment,
  } = fields

  if (isLessonForm) {
    return {
      formType: 'lesson',
      subject: { id: subject.id, label: subject.title },
      teacher: { id: teacher.id, label: teacher.employee.name },
      classroom: { id: classroom.id, label: classroom.title },
      student_group: {
        id: student_group.id,
        label: student_group.title,
      },
      comment: comment ?? '',
    }
  } else {
    return { formType: 'event', title }
  }
}

export const serializeEvent = ({
  start_time,
  end_time,
  ...event
}: LessonModelRead): ScheduleEventRead => ({
  // исключаем поля, которые не должны попасть в сериализуемый объект после спреда
  ...omit(event, [...lessonFormFields, ...eventFormFields]),
  type: 'read',
  state: 'normal',
  start_time: getSerializedTime(start_time),
  end_time: getSerializedTime(end_time),
  color: event.subject.color,
  ...serializeEventsFields(event),
})

export const deserializeEvent = (
  event: ScheduleEventRead
): DeserializedEvent => {
  switch (event.formType) {
    case 'lesson':
      return {
        ...event,
        subject_id: event.subject.id,
        teacher_id: event.teacher.id,
        classroom_id: event.classroom.id,
        student_group_id: event.student_group.id,
      }
    case 'event':
      return event
  }
}

export const timeToDate = (time: string) => {
  const timeToParse = getSerializedTime(time)
  return parse(timeToParse, timeFormat, new Date())
}

export const combineDateAndTime = (
  date: string | Date,
  time: string
) => {
  const dateStr =
    typeof date === 'string' ? date : format(date, dateFormat)
  const parsedDate = parse(dateStr, dateFormat, new Date())
  const parsedTime = timeToDate(time)

  return set(parsedDate, {
    hours: parsedTime.getHours(),
    minutes: parsedTime.getMinutes(),
    seconds: parsedTime.getSeconds(),
  })
}
