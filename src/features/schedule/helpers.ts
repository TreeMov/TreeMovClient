import type { LessonModelRead } from '@/api/generated/core'
import type { ISelectOption } from '@/components/ui/select/types'
import type {
  DeserializedEvent,
  ScheduleEvent,
  ScheduleEventFormFields,
  ScheduleEventRead,
  ScheduleLessonFormFields,
  ScheduleView,
  SerializedEventFields,
  SerializedLessonFields,
} from './types'

import {
  addHours,
  addMinutes,
  addWeeks,
  endOfDay,
  endOfWeek,
  format,
  parse,
  set,
  startOfDay,
  startOfToday,
  startOfWeek,
  subDays,
} from 'date-fns'
import { minutesInHour } from 'date-fns/constants'
import { omit } from 'lodash-es'

import { getDayHours, getWeeks } from '@/utils/helpers/dates'

import {
  dateFormat,
  eventFormFields,
  lessonFormFields,
  timeFormat,
} from './constants'
import { isSerializedEvent, isSerializedLesson } from './typeguards'

export const getScheduleHours = (start: number, end: number) =>
  getDayHours(
    addHours(startOfToday(), start),
    addHours(startOfToday(), end)
  )

export const getSerializedTime = (time: string) =>
  time.split(':').slice(0, 2).join(':')

export const serializeEventsFields = (
  fields: SerializedLessonFields | SerializedEventFields
): ScheduleLessonFormFields | ScheduleEventFormFields => {
  if (isSerializedLesson(fields)) {
    const { subject, teacher, classroom, student_group, comment } =
      fields

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
  }

  if (isSerializedEvent(fields)) {
    const { title, comment } = fields
    return { formType: 'event', title, comment: comment ?? '' }
  }

  throw new Error('unable to determine form type for event')
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
  color: event.subject?.color ?? '#000000',
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

export const getDateMax = (
  date: Date | string,
  view: ScheduleView
) => {
  switch (view) {
    case 'day':
      return format(endOfDay(date), dateFormat)
    case 'week':
      return format(endOfWeek(date), dateFormat)
    case 'month': {
      const weeks = getWeeks(date)
      return format(
        subDays(addWeeks(weeks[weeks.length - 1], 1), 1),
        dateFormat
      )
    }
  }
}

export const getDateMin = (
  date: Date | string,
  view: ScheduleView
) => {
  switch (view) {
    case 'day':
      return format(startOfDay(date), dateFormat)
    case 'week':
      return format(startOfWeek(date), dateFormat)
    case 'month': {
      const weeks = getWeeks(date)
      return format(weeks[0], dateFormat)
    }
  }
}

export const getTimeOptions = (
  startHour: number,
  endHour: number,
  segmentSize: number
): ISelectOption[] =>
  getScheduleHours(startHour, endHour)
    .map((hour) => {
      const segmentsCount = Math.ceil(minutesInHour / segmentSize)
      const segmentsValues = Array.from({
        length: segmentsCount,
      })
        .reduce<Date[]>(
          (acc, _, idx) => [
            ...acc,
            addMinutes(acc[idx], segmentSize),
          ],
          [hour]
        )
        .slice(0, -1)
      const segmentsOptions: ISelectOption[] = segmentsValues.map(
        (value) => {
          const time = format(value, timeFormat)
          return { label: time, value: time }
        }
      )

      return segmentsOptions
    })
    .flat()

export const getEventsByDay = (events: ScheduleEvent[]) => {
  const eventsByDay = new Map<string, ScheduleEvent[]>()

  for (const event of events) {
    const dayKey = format(new Date(event.date), dateFormat)
    const dayEvents = eventsByDay.get(dayKey)

    if (dayEvents) {
      dayEvents.push(event)
    } else {
      eventsByDay.set(dayKey, [event])
    }
  }

  return eventsByDay
}
