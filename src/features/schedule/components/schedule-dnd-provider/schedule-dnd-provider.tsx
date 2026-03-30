import type { ScheduleEvent, ScheduleEventRead } from '../../types'

import {
  PointerActivationConstraints,
  PointerSensor,
} from '@dnd-kit/dom'
import { DragDropProvider } from '@dnd-kit/react'
import { differenceInMinutes } from 'date-fns'
import { cloneDeep } from 'lodash-es'
import React, { useCallback, useMemo, useRef, useState } from 'react'

import { combineDateAndTime } from '../../helpers'
import {
  useDroppableEvent,
  useMouseEvents,
  useScheduleActions,
  useScheduleCalendar,
  useScheduleStoreContext,
  useScheduleTime,
} from '../../hooks'
import { ScheduleChangePeriodAlert } from '../alerts'
import { PeriodAlertEnum } from '../alerts/types'

type DragDropProviderProps = Parameters<typeof DragDropProvider>[0]
type OnDragStartProps = Parameters<
  Required<DragDropProviderProps>['onDragStart']
>[0]
type OnDragEndProps = Parameters<
  Required<DragDropProviderProps>['onDragEnd']
>[0]

export const ScheduleDndProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const { store } = useScheduleStoreContext()
  const { view } = useScheduleCalendar()
  const { segmentSize } = useScheduleTime()
  const { onChangeHandler, onChangePeriodHandler } =
    useScheduleActions()
  const { getMouseDate } = useMouseEvents()
  const { getEventRange } = useDroppableEvent()

  const initialEventRef = useRef<ScheduleEvent | null>(null)
  const eventRef = useRef<ScheduleEventRead | null>(null)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const onAlertSubmit = (value: PeriodAlertEnum) => {
    if (!eventRef.current || !initialEventRef.current) {
      return
    }

    switch (value) {
      case PeriodAlertEnum.ALL:
        onChangePeriodHandler(
          eventRef.current.id,
          eventRef.current.period_lesson_id!,
          initialEventRef.current
        )
        break
      case PeriodAlertEnum.CURRENT:
        onChangeHandler({
          dto: eventRef.current,
          prevData: initialEventRef.current,
        })
        break
    }
  }
  const onAlertCancel = () => {
    if (!eventRef.current || !initialEventRef.current) {
      return
    }

    store.updateEvent(eventRef.current.id, initialEventRef.current)
  }

  const sensors = useMemo(
    () => [
      PointerSensor.configure({
        activationConstraints: [
          new PointerActivationConstraints.Distance({ value: 20 }),
        ],
      }),
    ],
    []
  )

  const onDragStart = useCallback(
    ({ nativeEvent, operation: { source } }: OnDragStartProps) => {
      if (!source) {
        return
      }

      const event = source.data as ScheduleEvent
      const { date, start_time } = event
      initialEventRef.current = cloneDeep(event)

      const ev =
        nativeEvent as unknown as React.PointerEvent<HTMLDivElement>

      const clickedData =
        view !== 'month'
          ? getMouseDate(new Date(date), ev.clientY)
          : combineDateAndTime(date, start_time)

      if (clickedData) {
        const diff = differenceInMinutes(
          clickedData,
          combineDateAndTime(date, start_time)
        )
        const clickedSegment = Math.ceil(diff / segmentSize)
        store.startDrag(event, clickedSegment)
      }
    },
    [getMouseDate, segmentSize, store, view]
  )

  const onDragEnd = useCallback(
    ({ nativeEvent, operation: { target } }: OnDragEndProps) => {
      if (!store.dragEvent || !target) {
        return
      }

      const event =
        nativeEvent as unknown as React.PointerEvent<HTMLDivElement>
      const range: ReturnType<typeof getEventRange> =
        view !== 'month'
          ? getEventRange({
              day: new Date(target?.id),
              y: event.clientY,
              start_time: store.dragEvent?.start_time,
              end_time: store.dragEvent?.end_time,
            })
          : {
              startTime: store.dragEvent.start_time,
              endTime: store.dragEvent.end_time,
            }

      if (!range) {
        return
      }

      const { startTime, endTime } = range
      const nextEvent = {
        ...store.dragEvent,
        date: target.id as string,
        start_time: startTime,
        end_time: endTime,
      }
      const prevData = cloneDeep(store.dragEvent)
      store.updateEvent(nextEvent.id, nextEvent)

      if (nextEvent.type === 'create') {
        store.endDrag(nextEvent.id)
        return
      }

      if (nextEvent.period_lesson_id) {
        eventRef.current = cloneDeep(nextEvent)
        store.endDrag(nextEvent.id)
        setIsAlertOpen(true)
        return
      }

      onChangeHandler({
        dto: nextEvent,
        prevData,
      })
      store.endDrag(nextEvent.id)
    },
    [getEventRange, onChangeHandler, store, view]
  )

  return (
    <React.Fragment>
      <DragDropProvider
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        {children}
      </DragDropProvider>
      <ScheduleChangePeriodAlert
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onSubmit={onAlertSubmit}
        onCancel={onAlertCancel}
      />
    </React.Fragment>
  )
}
