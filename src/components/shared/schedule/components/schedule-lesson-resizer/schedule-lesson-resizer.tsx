import type { ScheduleLessonResizerProps } from './types'

import { isEqual as isEqualObjects } from 'lodash-es'
import React, { useRef, useState } from 'react'

import { useEventListener } from '@/hooks/use-event-listener'

import { useMouseEvents, useSchedule } from '../../hooks'

export const ScheduleLessonResizer: React.FC<
  ScheduleLessonResizerProps
> = ({ lesson, onResize }) => {
  const { id, date } = lesson

  const ref = useRef<HTMLDivElement>(null)
  const { store, contentRef, onChangeHandler } = useSchedule()
  const [isResizeMoveEnabled, setIsResizeMoveEnabled] =
    useState(false)
  const [initialLesson, setInitialLesson] = useState(lesson)

  const { onMouseDown, onMouseUp, onResizeMove } = useMouseEvents(
    ref,
    date,
    lesson
  )

  const onMouseDownHandler = () => {
    onMouseDown(() => {
      store.setLessonType(id, 'resize')
      setInitialLesson(lesson)
      setIsResizeMoveEnabled(true)
      onResize?.(true)
    })
  }

  const onMouseUpHandler = () => {
    onMouseUp(() => {
      store.setLessonType(id, initialLesson.type)
      setIsResizeMoveEnabled(false)
      onResize?.(false)

      if (initialLesson.type === 'create') {
        return
      }

      if (!isEqualObjects(initialLesson, lesson)) {
        onChangeHandler(lesson.id, lesson, initialLesson)
      }
    })
  }

  const onResizeMoveHandler = () =>
    onResizeMove(({ direction, nextTime }) => {
      if (direction === 'down') {
        store.updateLesson(id, {
          end_time: nextTime,
        })
      } else if (direction === 'up') {
        store.updateLesson(id, {
          start_time: nextTime,
        })
      }
    })

  useEventListener(ref, 'mousedown', onMouseDownHandler)
  useEventListener(
    document.body,
    'mouseup',
    onMouseUpHandler,
    !isResizeMoveEnabled
  )
  useEventListener(
    contentRef,
    'mousemove',
    onResizeMoveHandler(),
    !isResizeMoveEnabled
  )

  return (
    <div
      ref={ref}
      className="absolute bottom-0 left-0 h-4 w-full translate-y-[50%] cursor-n-resize"
    />
  )
}
