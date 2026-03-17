import type { ScheduleLesson } from '../../types'

import {
  PointerActivationConstraints,
  PointerSensor,
} from '@dnd-kit/dom'
import { DragDropProvider, DragOverlay } from '@dnd-kit/react'
import { differenceInMinutes } from 'date-fns'
import React, { useEffect } from 'react'

import { combineDateAndTime } from '../../helpers'
import {
  useContentOverlay,
  useDroppableLesson,
  useSchedule,
} from '../../hooks'
import { ScheduleCol } from '../schedule-col'
import { ScheduleColLessons } from '../schedule-col-lessons'
import { ScheduleContentWrapper } from '../schedule-content-wrapper'
import { ScheduleHeader } from '../schedule-header'
import { ScheduleHoursCol } from '../schedule-hours-col'

export const ScheduleContent: React.FC = () => {
  const {
    store,
    lessons,
    contentRef,
    days,
    config: { segmentSize },
    onChangeHandler,
  } = useSchedule()

  const { getMouseDate } = useContentOverlay()
  const { getLessonRange } = useDroppableLesson()

  useEffect(() => {
    store.syncLessons(lessons)
  }, [lessons, store])

  const sensors = [
    PointerSensor.configure({
      activationConstraints: [
        new PointerActivationConstraints.Distance({ value: 20 }),
      ],
    }),
  ]

  return (
    <ScheduleContentWrapper>
      <ScheduleHeader />
      <div className="grid grid-cols-[1fr_7fr]">
        <ScheduleHoursCol className="not-last:border-grey-200 not-last:border-r" />
        <DragDropProvider
          sensors={sensors}
          onDragStart={({ nativeEvent, operation: { source } }) => {
            const lesson = source?.data as ScheduleLesson
            const { date, start_time } = lesson

            const event =
              nativeEvent as unknown as React.PointerEvent<HTMLDivElement>

            const clickedData = getMouseDate(
              new Date(date),
              event.clientY
            )
            if (clickedData) {
              const diff = differenceInMinutes(
                clickedData,
                combineDateAndTime(date, start_time)
              )
              const clickedSegment = Math.ceil(diff / segmentSize)
              store.startDrag(lesson, clickedSegment)
            }
          }}
          onDragEnd={({ nativeEvent, operation: { target } }) => {
            const event =
              nativeEvent as unknown as React.PointerEvent<HTMLDivElement>
            if (!store.dragLesson || !target) {
              return
            }

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
            const nextLesson: ScheduleLesson = {
              ...store.dragLesson,
              date: target.id as string,
              start_time: startTime,
              end_time: endTime,
            }
            store.updateLesson(nextLesson.id, nextLesson)
            if (store.dragLesson.type !== 'create') {
              onChangeHandler(
                store.dragLesson.id,
                nextLesson,
                store.dragLesson
              )
            }
            store.endDrag()
          }}
        >
          <div ref={contentRef} className="grid grid-cols-7">
            {days.map((day) => (
              <ScheduleColLessons
                key={day.getTime()}
                className="not-last:border-grey-200 not-last:border-r"
                day={day}
              >
                <ScheduleCol date={day} />
              </ScheduleColLessons>
            ))}
          </div>
          <DragOverlay dropAnimation={null}>{null}</DragOverlay>
        </DragDropProvider>
      </div>
    </ScheduleContentWrapper>
  )
}
