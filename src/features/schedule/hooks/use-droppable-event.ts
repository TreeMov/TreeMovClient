import {
  addHours,
  addMinutes,
  differenceInMinutes,
  format,
  isValid,
  subMinutes,
} from 'date-fns'

import { timeFormat } from '../constants'
import { combineDateAndTime } from '../helpers'

import { useMouseEvents } from './use-mouse-events'
import { useSchedule } from './use-schedule'

type GetEventRangeParams = {
  day: Date
  y: number
  start_time: string
  end_time: string
}

export const useDroppableEvent = () => {
  const {
    hours,
    store,
    config: { segmentSize },
  } = useSchedule()
  const { getMouseDate } = useMouseEvents()

  const isOutOfRange = (day: Date, timeToCompare: string) => {
    const boardMaxHour = addHours(
      combineDateAndTime(
        day,
        format(hours[hours.length - 1], timeFormat)
      ),
      1
    )
    const nextTime = combineDateAndTime(day, timeToCompare)

    return nextTime > boardMaxHour
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
      (store.dragSegment ?? 0) * segmentSize
    )
    const startTime = format(dateWithOffset, timeFormat)
    const endTime = format(
      addMinutes(dateWithOffset, eventDurationInMinutes),
      timeFormat
    )

    // todo при endTime > 23:59 происходит переход в 00:00 и ломается логика
    // нужно продумать переход времени так же на следующую дату
    // чтобы работало корректно со всеми диапазонами часов
    if (isOutOfRange(day, endTime)) {
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

      const formattedRangeStartTime = format(
        rangeStartTime,
        timeFormat
      )
      const formattedRangeEndTime = format(rangeEndTime, timeFormat)

      return {
        startTime: formattedRangeStartTime,
        endTime: formattedRangeEndTime,
      }
    }
    return { startTime, endTime }
  }

  return { getEventRange }
}
