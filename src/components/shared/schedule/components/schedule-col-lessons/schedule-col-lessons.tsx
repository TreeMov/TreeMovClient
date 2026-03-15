import { isSameDay } from 'date-fns'
import React from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { useSchedule } from '../../hooks'
import { ScheduleLesson } from '../schedule-lesson'

export const ScheduleColLessons: React.FC<
  React.ComponentProps<'div'> & { day: Date }
> = ({ day, className, children, ...props }) => {
  const { store } = useSchedule()

  const lessons = store.lessons.filter(({ date }) =>
    isSameDay(date, day)
  )

  return (
    <div className={cn('relative', className)} {...props}>
      {children}
      {lessons.map((lesson) => (
        <ScheduleLesson key={lesson.id} lesson={lesson} />
      ))}
    </div>
  )
}
