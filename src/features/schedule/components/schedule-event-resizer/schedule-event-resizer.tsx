import type { ScheduleEventRead } from '../../types'
import type { ScheduleEventResizerProps } from './types'

import { cloneDeep, isEqual as isEqualObjects } from 'lodash-es'
import React, { useRef, useState } from 'react'

import { useEventListener } from '@/hooks/use-event-listener'

import {
  useMouseEvents,
  useScheduleActions,
  useScheduleStoreContext,
} from '../../hooks'
import { ScheduleChangePeriodAlert } from '../alerts'
import { PeriodAlertEnum } from '../alerts/types'

export const ScheduleEventResizer: React.FC<
  ScheduleEventResizerProps
> = ({ event }) => {
  const { id, start_time, end_time, date } = event

  const ref = useRef<HTMLDivElement>(null)
  const { store, contentRef } = useScheduleStoreContext()
  const { onChangeHandler, onChangePeriodHandler } =
    useScheduleActions()
  const [isResizeMoveEnabled, setIsResizeMoveEnabled] =
    useState(false)
  const [initialEvent, setInitialEvent] = useState(cloneDeep(event))

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const onAlertSubmit = (value: PeriodAlertEnum) => {
    const currentEvent = event as ScheduleEventRead
    switch (value) {
      case PeriodAlertEnum.ALL:
        onChangePeriodHandler(
          currentEvent.id,
          currentEvent.period_lesson_id!,
          { dto: currentEvent, prevData: initialEvent }
        )
        break
      case PeriodAlertEnum.CURRENT:
        onChangeHandler({
          dto: currentEvent,
          prevData: initialEvent,
        })
        break
    }
  }
  const onAlertCancel = () => {
    store.updateEvent(id, initialEvent)
  }

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

      if (event.period_lesson_id) {
        setIsAlertOpen(true)
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
    <React.Fragment>
      <div
        ref={ref}
        className="absolute bottom-0 left-0 h-4 w-full translate-y-[50%] cursor-n-resize"
      />
      <ScheduleChangePeriodAlert
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onSubmit={onAlertSubmit}
        onCancel={onAlertCancel}
      />
    </React.Fragment>
  )
}
