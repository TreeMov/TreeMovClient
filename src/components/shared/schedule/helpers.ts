import type { LessonModelRead } from '@/api/generated/core'

import { addHours, parse, set, startOfToday } from 'date-fns'

import { getDayHours } from '@/utils/helpers/dates'

import { dateFormat } from './constants'

export const getScheduleHours = () =>
  getDayHours(
    addHours(startOfToday(), 8),
    addHours(startOfToday(), 22)
  )

export const getSerializedTime = (time: string) =>
  time.split(':').slice(0, 2).join(':')

export const serializeLesson = ({
  start_time,
  end_time,
  ...lesson
}: LessonModelRead): LessonModelRead => ({
  ...lesson,
  start_time: getSerializedTime(start_time),
  end_time: getSerializedTime(end_time),
})

export const timeToDate = (time: string) => {
  const timeToParse = getSerializedTime(time)
  return parse(timeToParse, 'HH:mm', new Date())
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
