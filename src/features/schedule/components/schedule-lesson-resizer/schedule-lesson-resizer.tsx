import type { ScheduleLessonResizerProps } from './types'

import { cloneDeep, isEqual as isEqualObjects } from 'lodash-es'
import React, { useRef, useState } from 'react'

import { useEventListener } from '@/hooks/use-event-listener'

import { useMouseEvents, useSchedule } from '../../hooks'

export const ScheduleLessonResizer: React.FC<
  ScheduleLessonResizerProps
> = ({ lesson }) => {
  const { id, start_time, end_time, date } = lesson

  const ref = useRef<HTMLDivElement>(null)
  const { store, contentRef, onChangeHandler } = useSchedule()
  const [isResizeMoveEnabled, setIsResizeMoveEnabled] =
    useState(false)
  const [initialLesson, setInitialLesson] = useState(
    cloneDeep(lesson)
  )

  const { onMouseDown, onMouseUp, onResizeMove } = useMouseEvents()

  const onMouseDownHandler = () => {
    onMouseDown(() => {
      setInitialLesson(cloneDeep(lesson))
      setIsResizeMoveEnabled(true)
      store.setLessonState(id, 'resize')
    })
  }

  const onMouseUpHandler = () => {
    onMouseUp(() => {
      setIsResizeMoveEnabled(false)
      store.setLessonState(id, initialLesson.state)

      if (lesson.type === 'create') {
        return
      }

      if (!isEqualObjects(initialLesson, lesson)) {
        onChangeHandler({
          type: 'update',
          dto: lesson,
          prevData: initialLesson,
        })
      }
    })
  }

  const onResizeMoveHandler = () =>
    onResizeMove(
      date,
      start_time,
      end_time,
      ({ direction, nextTime }) => {
        if (direction === 'down') {
          store.updateLesson(id, {
            end_time: nextTime,
          })
        } else if (direction === 'up') {
          store.updateLesson(id, {
            start_time: nextTime,
          })
        }
      }
    )

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
