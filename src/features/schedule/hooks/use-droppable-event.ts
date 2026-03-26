import {
  addHours,
  addMinutes,
  differenceInMinutes,
  format,
  isValid,
  subHours,
  subMinutes,
} from 'date-fns'

import { timeFormat } from '../constants'
import { combineDateAndTime } from '../helpers'

import { useMouseEvents } from './use-mouse-events'
import { useScheduleStore, useScheduleTime } from './use-schedule'

type GetEventRangeParams = {
  day: Date
  y: number
  start_time: string
  end_time: string
}

export const useDroppableEvent = () => {
  const { hours, segmentSize } = useScheduleTime()
  const dragSegment = useScheduleStore((store) => store.dragSegment)
  const { getMouseDate } = useMouseEvents()

  const isOutOfRangeUpper = (day: Date, dateTimeToCompare: Date) => {
    const boardMinHour = addMinutes(
      subHours(
        combineDateAndTime(day, format(hours[0], timeFormat)),
        1
      ),
      59
    )

    return dateTimeToCompare < boardMinHour
  }

  const isOutOfRangeBottom = (day: Date, dateTimeToCompare: Date) => {
    const boardMaxHour = addHours(
      combineDateAndTime(
        day,
        format(hours[hours.length - 1], timeFormat)
      ),
      1
    )

    return dateTimeToCompare > boardMaxHour
  }

  const getExtremeRange = (
    day: Date,
    eventDurationInMinutes: number
  ) => {
    const rangeEndTime = addHours(
      combineDateAndTime(
        day,
        format(hours[hours.length - 1], timeFormat)
      ),
      1
    )
    const rangeStartTime = subMinutes(
      rangeEndTime,
      eventDurationInMinutes
    )

    const formattedRangeStartTime = format(rangeStartTime, timeFormat)
    const formattedRangeEndTime = format(rangeEndTime, timeFormat)

    return {
      startTime: formattedRangeStartTime,
      endTime: formattedRangeEndTime,
    }
  }

  const getEventRange = ({
    day,
    y,
    start_time,
    end_time,
  }: GetEventRangeParams) => {
    const date = getMouseDate(day, y)
    if (!isValid(date)) {
      return null
    }

    const startTimeDate = combineDateAndTime(day, start_time)
    const endTimeDate = combineDateAndTime(day, end_time)
    const eventDurationInMinutes = differenceInMinutes(
      endTimeDate,
      startTimeDate
    )

    const dateWithOffset = subMinutes(
      date ?? start_time,
      (dragSegment ?? 0) * segmentSize
    )
    const startTime = dateWithOffset
    const endTime = addMinutes(dateWithOffset, eventDurationInMinutes)

    if (isOutOfRangeBottom(day, endTime))
      return getExtremeRange(day, eventDurationInMinutes)

    if (isOutOfRangeUpper(day, startTime))
      return getExtremeRange(day, eventDurationInMinutes)

    return {
      startTime: format(startTime, timeFormat),
      endTime: format(endTime, timeFormat),
    }
  }

  return { getEventRange }
}
