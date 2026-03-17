import {
  addMinutes,
  differenceInMinutes,
  format,
  isValid,
  subMinutes,
} from 'date-fns'

import { timeFormat } from '../constants'
import { combineDateAndTime } from '../helpers'

import { useContentOverlay } from './use-content-overlay'
import { useSchedule } from './use-schedule'

type GetLessonRangeParams = {
  day: Date
  y: number
  start_time: string
  end_time: string
}

export const useDroppableLesson = () => {
  const {
    store,
    config: { segmentSize },
  } = useSchedule()
  const { getMouseDate } = useContentOverlay()

  const getLessonRange = ({
    day,
    y,
    start_time,
    end_time,
  }: GetLessonRangeParams) => {
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

  return { getLessonRange }
}
