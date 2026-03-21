import type { ScheduleEventResizerProps } from './types'

import { cloneDeep, isEqual as isEqualObjects } from 'lodash-es'
import React, { useRef, useState } from 'react'

import { useEventListener } from '@/hooks/use-event-listener'

import { useMouseEvents, useSchedule } from '../../hooks'

export const ScheduleEventResizer: React.FC<
  ScheduleEventResizerProps
> = ({ event }) => {
  const { id, start_time, end_time, date } = event

  const ref = useRef<HTMLDivElement>(null)
  const { store, contentRef, onChangeHandler } = useSchedule()
  const [isResizeMoveEnabled, setIsResizeMoveEnabled] =
    useState(false)
  const [initialEvent, setInitialEvent] = useState(cloneDeep(event))

  const { onMouseDown, onMouseUp, onResizeMove } = useMouseEvents()

  const onMouseDownHandler = () => {
    onMouseDown(() => {
      setInitialEvent(cloneDeep(event))
      setIsResizeMoveEnabled(true)
      store.setEventState(id, 'resize')
    })
  }

  const onMouseUpHandler = () => {
    onMouseUp(() => {
      setIsResizeMoveEnabled(false)
      store.setEventState(id, initialEvent.state)

      if (event.type === 'create') {
        return
      }

      if (!isEqualObjects(initialEvent, event)) {
        onChangeHandler({
          dto: event,
          prevData: initialEvent,
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
          store.updateEvent(id, {
            end_time: nextTime,
          })
        } else if (direction === 'up') {
          store.updateEvent(id, {
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
