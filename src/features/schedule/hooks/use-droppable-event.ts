import {
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
    store,
    config: { segmentSize },
  } = useSchedule()
  const { getMouseDate } = useMouseEvents()

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

    const dateWithOffset = subMinutes(
      date ?? start_time,
      (store.dragSegment ?? 0) * segmentSize
    )
    const startTime = format(dateWithOffset, timeFormat)
    const endTime = format(
      addMinutes(
        dateWithOffset,
        differenceInMinutes(
          combineDateAndTime(day, end_time),
          combineDateAndTime(day, start_time)
        )
      ),
      timeFormat
    )

    return { startTime, endTime }
  }

  return { getEventRange }
}
