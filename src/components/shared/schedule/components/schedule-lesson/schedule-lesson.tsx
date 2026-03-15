import type { LessonModelRead } from '@/api/generated/core'

import { differenceInMinutes, format } from 'date-fns'
import React from 'react'

import { combineDateAndTime } from '../../helpers'
import {
  useContentOverlay,
  useLessonPosition,
  useSchedule,
} from '../../hooks'
import { ScheduleLessonResizer } from '../schedule-lesson-resizer'

export const ScheduleLesson: React.FC<{
  lesson: LessonModelRead
}> = ({ lesson }) => {
  const {
    contentRef,
    config: { segmentSize },
  } = useSchedule()
  const { id, start_time, end_time, subject, teacher, date } = lesson
  const { getMouseDate } = useContentOverlay()
  const { getLessonStyle } = useLessonPosition(new Date(date), lesson)

  return (
    <div
      className="absolute left-0 z-10 min-w-5/6 cursor-pointer rounded-xl border border-black bg-white p-2.5"
      style={getLessonStyle(start_time, end_time)}
    >
      <div>{id}</div>
      <div>{subject.title}</div>
      <div>{teacher.employee.name}</div>
      <div>
        {format(combineDateAndTime(date, start_time), 'HH:mm')}-
        {format(combineDateAndTime(date, end_time), 'HH:mm')}
      </div>
      <div
        className="absolute top-0 left-0 size-full"
        onMouseDown={(e) => {
          if (!contentRef.current) {
            return
          }

          contentRef.current.style.cursor = 'grab'

          const clickedData = getMouseDate(new Date(date), e.clientY)
          if (clickedData) {
            const diff = differenceInMinutes(
              clickedData,
              combineDateAndTime(date, start_time)
            )
            const clickedSegment = Math.ceil(diff / segmentSize)
            // eslint-disable-next-line no-console
            console.log({ clickedSegment })
          }
        }}
        onMouseUp={() => {
          if (!contentRef.current) {
            return
          }

          contentRef.current.style.cursor = ''
        }}
      />
      <ScheduleLessonResizer {...lesson} />
    </div>
  )
}
