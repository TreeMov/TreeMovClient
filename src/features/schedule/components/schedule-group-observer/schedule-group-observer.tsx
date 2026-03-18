import type { ScheduleLesson } from '../../types'
import type { ScheduleGroupObserverProps } from './types'

import { isAfter, isBefore } from 'date-fns'
import React, { useMemo } from 'react'

import { combineDateAndTime } from '../../helpers'

export const ScheduleGroupObserver: React.FC<
  ScheduleGroupObserverProps
> = ({ lessons, lesson, children }) => {
  const group = useMemo<ScheduleLesson[]>(
    () =>
      lessons.filter(
        ({ date, start_time, end_time }) =>
          isBefore(
            combineDateAndTime(date, start_time),
            combineDateAndTime(lesson.date, lesson.start_time)
          ) &&
          isAfter(
            combineDateAndTime(date, end_time),
            combineDateAndTime(lesson.date, lesson.start_time)
          )
      ),
    [lesson.date, lesson.start_time, lessons]
  )

  return children(group.length)
}
