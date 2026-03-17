import type { ScheduleLesson as ScheduleLessonType } from '../../types'

import { useDraggable } from '@dnd-kit/react'
import React, { useState } from 'react'

import { useLessonPosition, useSchedule } from '../../hooks'
import { ScheduleLessonResizer } from '../schedule-lesson-resizer'
import { SchedulePopover } from '../schedule-popover'
import { Lesson } from '../ui'

export const ScheduleLesson: React.FC<{
  lesson: ScheduleLessonType
}> = ({ lesson }) => {
  const { store } = useSchedule()
  const { id, start_time, end_time, date } = lesson
  const { getLessonStyle } = useLessonPosition(new Date(date))
  const [isResize, setIsResize] = useState(false)

  const { ref } = useDraggable({
    id,
    data: lesson,
    disabled: isResize,
  })

  const isActive = store.activeLessonId === id
  const isDrag = store.dragLesson?.id === id

  return (
    <Lesson
      ref={ref}
      style={getLessonStyle(start_time, end_time)}
      isActive={isActive}
      isDrag={isDrag}
      lesson={lesson}
    >
      <SchedulePopover {...lesson}>
        <div className="absolute top-0 left-0 size-full" />
      </SchedulePopover>

      <ScheduleLessonResizer lesson={lesson} onResize={setIsResize} />
    </Lesson>
  )
}
