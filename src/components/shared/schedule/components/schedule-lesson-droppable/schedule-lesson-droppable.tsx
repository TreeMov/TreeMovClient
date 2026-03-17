import type { ScheduleLessonDroppableProps } from './types'

import { useMouse } from '@uidotdev/usehooks'
import React from 'react'

import { useDroppableLesson, useLessonPosition } from '../../hooks'
import { Lesson } from '../ui'

export const ScheduleLessonDroppable: React.FC<
  ScheduleLessonDroppableProps
> = ({ day, lesson }) => {
  const [{ y }] = useMouse()

  const { getLessonStyle } = useLessonPosition(day)
  const { getLessonRange } = useDroppableLesson()
  const range = getLessonRange({
    day,
    y,
    start_time: lesson.start_time,
    end_time: lesson.end_time,
  })

  if (!range) {
    return null
  }

  const { startTime, endTime } = range
  return (
    <Lesson
      className="z-15"
      lesson={{ ...lesson, start_time: startTime, end_time: endTime }}
      isDrop
      style={getLessonStyle(range.startTime, range.endTime)}
    />
  )
}
