import type { LessonModelRead } from '@/api/generated/core'
import type { Direction } from '../../types'

import { format, isAfter, isBefore, isEqual } from 'date-fns'
import { isNil } from 'lodash-es'
import { isEqual as isEqualObjects } from 'lodash-es'
import React, { useRef, useState } from 'react'

import { useEventListener } from '@/hooks/use-event-listener'

import { fullDateFormat } from '../../constants'
import { combineDateAndTime } from '../../helpers'
import { useContentOverlay, useSchedule } from '../../hooks'

export const ScheduleLessonResizer: React.FC<LessonModelRead> = (
  lesson
) => {
  const { id, start_time, end_time, date } = lesson

  const ref = useRef<HTMLDivElement>(null)
  const { store, contentRef, onChangeHandler } = useSchedule()
  const [direction, setDirection] = useState<Direction | null>(null)
  const [isTransition, setIsTransition] = useState(false)
  const [isPointerDown, setIsPointerDown] = useState(false)
  const [initialLesson, setInitialLesson] = useState(lesson)

  const { getMouseDate, getSegmentData } = useContentOverlay()

  useEventListener(ref, 'pointerdown', (e) => {
    setInitialLesson(lesson)

    if (!ref.current) {
      return
    }

    const event = e as unknown as React.PointerEvent<HTMLDivElement>
    ref.current.setPointerCapture(event.pointerId)
    setIsPointerDown(true)
    setDirection('down')
    setIsTransition(false)
  })

  useEventListener(ref, 'pointerup', () => {
    if (!isEqualObjects(initialLesson, lesson)) {
      onChangeHandler(lesson.id, lesson, initialLesson)
    }

    setIsPointerDown(false)
  })

  const onPoinerMove = (e: Event) => {
    if (!contentRef.current) {
      return
    }

    const event = e as unknown as React.PointerEvent<HTMLDivElement>

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

      if (direction === 'down') {
        store.updateLesson(id, {
          end_time: nextTimeFormatted,
        })
      } else if (direction === 'up') {
        store.updateLesson(id, {
          start_time: nextTimeFormatted,
        })
      }
    }
  }

  useEventListener(ref, 'pointermove', onPoinerMove, !isPointerDown)

  return (
    <div
      ref={ref}
      className="absolute bottom-0 left-0 h-4 w-full translate-y-[50%] cursor-n-resize"
    />
  )
}
