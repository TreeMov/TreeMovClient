import { useDroppable } from '@dnd-kit/react'
import { format, isSameDay } from 'date-fns'
import React from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { dateFormat } from '../../constants'
import { useSchedule } from '../../hooks'
import { ScheduleGroupObserver } from '../schedule-group-observer'
import { ScheduleLesson } from '../schedule-lesson'
import { ScheduleLessonDroppable } from '../schedule-lesson-droppable'

export const ScheduleColLessons: React.FC<
  React.ComponentProps<'div'> & { day: Date }
> = ({ day, className, children, ...props }) => {
  const { store } = useSchedule()

  const { ref, isDropTarget } = useDroppable({
    id: format(day, dateFormat),
  })

  const lessons = store.lessons.filter(({ date }) =>
    isSameDay(date, day)
  )

  return (
    <div ref={ref} className={cn('relative', className)} {...props}>
      {children}
      {isDropTarget && store.dragLesson && (
        <ScheduleLessonDroppable
          day={day}
          lesson={store.dragLesson}
        />
      )}
      {lessons.map((lesson) => (
        <ScheduleGroupObserver
          key={lesson.id}
          lessons={lessons}
          lesson={lesson}
        >
          {(group) => (
            <ScheduleLesson lesson={lesson} group={group} />
          )}
        </ScheduleGroupObserver>
      ))}
    </div>
  )
}
