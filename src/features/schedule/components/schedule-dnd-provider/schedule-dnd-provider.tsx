import type { ScheduleLesson } from '../../types'

import {
  PointerActivationConstraints,
  PointerSensor,
} from '@dnd-kit/dom'
import { DragDropProvider } from '@dnd-kit/react'
import { differenceInMinutes } from 'date-fns'
import React from 'react'

import { combineDateAndTime } from '../../helpers'
import {
  useDroppableLesson,
  useMouseEvents,
  useSchedule,
} from '../../hooks'

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
  const {
    store,
    config: { segmentSize },
    onChangeHandler,
  } = useSchedule()
  const { getMouseDate } = useMouseEvents()
  const { getLessonRange } = useDroppableLesson()

  const sensors = [
    PointerSensor.configure({
      activationConstraints: [
        new PointerActivationConstraints.Distance({ value: 20 }),
      ],
    }),
  ]

  const onDragStart = ({
    nativeEvent,
    operation: { source },
  }: OnDragStartProps) => {
    if (!source) {
      return
    }

    const lesson = source.data as ScheduleLesson
    const { date, start_time } = lesson

    const event =
      nativeEvent as unknown as React.PointerEvent<HTMLDivElement>

    const clickedData = getMouseDate(new Date(date), event.clientY)
    if (clickedData) {
      const diff = differenceInMinutes(
        clickedData,
        combineDateAndTime(date, start_time)
      )
      const clickedSegment = Math.ceil(diff / segmentSize)
      store.startDrag(lesson, clickedSegment)
    }
  }

  const onDragEnd = ({
    nativeEvent,
    operation: { target },
  }: OnDragEndProps) => {
    if (!store.dragLesson || !target) {
      return
    }

    const event =
      nativeEvent as unknown as React.PointerEvent<HTMLDivElement>
    const range = getLessonRange({
      day: new Date(target?.id),
      y: event.clientY,
      start_time: store.dragLesson?.start_time,
      end_time: store.dragLesson?.end_time,
    })
    if (!range) {
      return
    }

    const { startTime, endTime } = range
    const nextLesson = {
      ...store.dragLesson,
      date: target.id as string,
      start_time: startTime,
      end_time: endTime,
    }
    store.updateLesson(nextLesson.id, nextLesson)
    if (nextLesson.type !== 'create') {
      onChangeHandler({
        type: 'update',
        dto: nextLesson,
        prevData: store.dragLesson,
      })
    }

    store.endDrag(nextLesson.id)
  }

  return (
    <DragDropProvider
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}
    </DragDropProvider>
  )
}
