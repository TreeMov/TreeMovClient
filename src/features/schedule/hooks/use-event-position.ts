import {
  addHours,
  differenceInMinutes,
  max,
  min,
  setHours,
  startOfDay,
} from 'date-fns'
import { useCallback, useMemo } from 'react'

import { combineDateAndTime } from '../helpers'

import { useScheduleTime } from './use-schedule'

export const useEventPosition = (date: Date) => {
  const { hours } = useScheduleTime()

  const scheduleRange = useMemo(() => {
    if (hours.length === 0) {
      return null
    }

    const firstHour = hours[0].getHours()
    const lastHour = hours[hours.length - 1].getHours()
    const dayStart = startOfDay(date)
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
  }, [date, hours])

  const getEventPosition = useCallback(
    (
      start_time: string,
      end_time: string
    ): Pick<React.CSSProperties, 'top' | 'height'> => {
      if (!scheduleRange) {
        return { top: '0%', height: '0%' }
      }

      const clampPercent = (value: number) =>
        Math.min(Math.max(value, 0), 100)
      const toPercent = (minutes: number) =>
        (minutes / scheduleRange.totalMinutes) * 100

      const eventStart = combineDateAndTime(date, start_time)
      const eventEnd = combineDateAndTime(date, end_time)
      const visibleStart = max([
        eventStart,
        scheduleRange.scheduleStart,
      ])
      const visibleEnd = min([eventEnd, scheduleRange.scheduleEnd])
      const eventOffsetMinutes = differenceInMinutes(
        eventStart,
        scheduleRange.scheduleStart
      )
      const visibleDurationMinutes = Math.max(
        differenceInMinutes(visibleEnd, visibleStart),
        0
      )
      const topPercent = clampPercent(toPercent(eventOffsetMinutes))
      const heightPercent = clampPercent(
        toPercent(visibleDurationMinutes)
      )

      return {
        top: `${topPercent}%`,
        height: `${heightPercent}%`,
      }
    },
    [date, scheduleRange]
  )

  return { getEventPosition }
}
