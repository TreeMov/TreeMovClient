import type { LessonModelRead } from '@/api/generated/core'

import {
  addHours,
  differenceInMinutes,
  max,
  min,
  setHours,
  startOfDay,
} from 'date-fns'
import { useMemo } from 'react'

import { combineDateAndTime } from '../helpers'

import { useSchedule } from './use-schedule'

export const useLessonPosition = (
  day: Date,
  { date }: LessonModelRead
) => {
  const { store } = useSchedule()

  const scheduleRange = useMemo(() => {
    if (store.hours.length === 0) {
      return null
    }

    const firstHour = store.hours[0].getHours()
    const lastHour = store.hours[store.hours.length - 1].getHours()
    const dayStart = startOfDay(day)
    const scheduleStart = setHours(dayStart, firstHour)
    const scheduleEnd = addHours(setHours(dayStart, lastHour), 1)
    const totalMinutes = differenceInMinutes(
      scheduleEnd,
      scheduleStart
    )

    if (totalMinutes <= 0) {
      return null
    }

    return { scheduleStart, scheduleEnd, totalMinutes }
  }, [day, store.hours])

  const clampPercent = (value: number) =>
    Math.min(Math.max(value, 0), 100)
  const toPercent = (minutes: number) =>
    scheduleRange ? (minutes / scheduleRange.totalMinutes) * 100 : 0

  const getLessonStyle = (
    start_time: string,
    end_time: string
  ): Pick<React.CSSProperties, 'top' | 'height'> => {
    if (!scheduleRange) {
      return { top: '0%', height: '0%' }
    }

    const lessonStart = combineDateAndTime(date, start_time)
    const lessonEnd = combineDateAndTime(date, end_time)
    const visibleStart = max([
      lessonStart,
      scheduleRange.scheduleStart,
    ])
    const visibleEnd = min([lessonEnd, scheduleRange.scheduleEnd])
    const lessonOffsetMinutes = differenceInMinutes(
      lessonStart,
      scheduleRange.scheduleStart
    )
    const visibleDurationMinutes = Math.max(
      differenceInMinutes(visibleEnd, visibleStart),
      0
    )
    const topPercent = clampPercent(toPercent(lessonOffsetMinutes))
    const heightPercent = clampPercent(
      toPercent(visibleDurationMinutes)
    )

    return {
      top: `${topPercent}%`,
      height: `${heightPercent}%`,
    }
  }

  return { getLessonStyle }
}
