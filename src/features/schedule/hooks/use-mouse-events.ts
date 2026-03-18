import type { Direction } from '../types'

import {
  addMinutes,
  format,
  getHours,
  getMinutes,
  isAfter,
  isBefore,
  isEqual,
  set,
} from 'date-fns'
import { minutesInHour } from 'date-fns/constants'
import { isNil } from 'lodash-es'
import { useState } from 'react'

import { fullDateFormat } from '../constants'
import { combineDateAndTime } from '../helpers'

import { useSchedule } from './use-schedule'

export const useMouseEvents = () => {
  const {
    contentRef,
    config: { segmentSize },
    hours,
  } = useSchedule()
  const [direction, setDirection] = useState<Direction | null>(null)
  const [isTransition, setIsTransition] = useState(false)

  const getSegmentData = (content: HTMLDivElement) => {
    const contentRect = content.getBoundingClientRect()
    const cellHeight = contentRect.height / hours.length

    const segmentsCount = Math.ceil(minutesInHour / segmentSize)
    const segmentHeight = cellHeight / segmentsCount

    return { segmentsCount, segmentHeight, cellHeight }
  }

  const getMouseDate = (day: Date, yPosition: number) => {
    const contentNode = contentRef.current
    if (!contentNode) {
      return
    }

    const { cellHeight, segmentHeight } = getSegmentData(contentNode)
    const contentRect = contentNode.getBoundingClientRect()
    const contentTop = contentRect.top

    const relYPosition = yPosition - contentTop
    const currCell = Math.floor(relYPosition / cellHeight)
    const cellPosition = relYPosition - currCell * cellHeight

    const currentSegment = Math.floor(cellPosition / segmentHeight)

    const hour = hours[currCell]

    const lessonDate = addMinutes(
      set(day, {
        hours: getHours(hour),
        minutes: getMinutes(hour),
        seconds: 0,
        milliseconds: 0,
      }),
      currentSegment * segmentSize
    )

    return lessonDate
  }

  const onMouseDown = (cb?: () => void) => {
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
      date: string,
      start_time: string,
      end_time: string,
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

  return {
    onMouseDown,
    onMouseUp,
    onResizeMove,
    getMouseDate,
    getSegmentData,
  }
}
