import type { Direction, ScheduleLesson } from '../types'

import { format, isAfter, isBefore, isEqual } from 'date-fns'
import { isNil } from 'lodash-es'
import { useState } from 'react'

import { fullDateFormat } from '../constants'
import { combineDateAndTime } from '../helpers'

import { useContentOverlay } from './use-content-overlay'
import { useSchedule } from './use-schedule'

export const useMouseEvents = (
  ref: React.RefObject<HTMLDivElement | null>,
  date: string,
  lesson: ScheduleLesson
) => {
  const { start_time, end_time } = lesson

  const { contentRef } = useSchedule()
  const [direction, setDirection] = useState<Direction | null>(null)
  const [isTransition, setIsTransition] = useState(false)

  const { getMouseDate, getSegmentData } = useContentOverlay()

  const onMouseDown = (cb?: () => void) => {
    if (!ref.current) {
      return
    }

    document.body.style.cursor = 'n-resize'

    setDirection('down')
    setIsTransition(false)
    cb?.()
  }

  const onMouseUp = (cb?: () => void) => {
    document.body.style.cursor = ''
    cb?.()
  }

  const onResizeMove =
    (
      cb?: (params: {
        direction: Direction | null
        nextTime: string
        nextDate: string
      }) => void
    ) =>
    (e: Event) => {
      if (!contentRef.current) {
        return
      }

      const event = e as unknown as React.MouseEvent<
        HTMLDivElement,
        MouseEvent
      >

      const { segmentHeight } = getSegmentData(contentRef.current)
      const offset = segmentHeight / 2
      const nextDate = getMouseDate(
        new Date(date),
        event.clientY + offset
      )

      if (nextDate) {
        const nextDateFormatted = format(nextDate, fullDateFormat)
        const nextTimeFormatted = nextDateFormatted.split(' ')[1]

        const startTime = combineDateAndTime(date, start_time)
        const endtime = combineDateAndTime(date, end_time)

        const isTransitionState =
          (direction === 'down' && isEqual(nextDate, startTime)) ||
          (direction === 'up' && isEqual(nextDate, endtime))

        if (isTransitionState) {
          setDirection(null)
          setIsTransition(true)
          return
        }

        const isTransitionDirection = isTransition && isNil(direction)

        if (isTransitionDirection && isBefore(startTime, nextDate)) {
          setDirection('down')
        }

        if (isTransitionDirection && isAfter(startTime, nextDate)) {
          setDirection('up')
        }

        cb?.({
          direction,
          nextDate: nextDateFormatted,
          nextTime: nextTimeFormatted,
        })
      }
    }

  return { onMouseDown, onMouseUp, onResizeMove }
}
