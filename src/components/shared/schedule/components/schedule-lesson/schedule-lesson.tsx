import type { ScheduleLesson as ScheduleLessonType } from '../../types'

import { useDraggable } from '@dnd-kit/react'
import React from 'react'

import { useLessonPosition } from '../../hooks'
import { ScheduleLessonResizer } from '../schedule-lesson-resizer'
import { SchedulePopover } from '../schedule-popover'
import { Lesson } from '../ui'

export const ScheduleLesson: React.FC<{
  lesson: ScheduleLessonType
}> = ({ lesson }) => {
  const { id, start_time, end_time, date, state } = lesson
  const { getLessonStyle } = useLessonPosition(new Date(date))

  const { ref } = useDraggable({
    id,
    data: lesson,
    disabled: state === 'resize',
  })

  return (
    <Lesson
      style={getLessonStyle(start_time, end_time)}
      isActive={state === 'active'}
      isDrag={state === 'drag'}
      lesson={lesson}
    >
      <div ref={ref} className="absolute top-0 left-0 size-full">
        <SchedulePopover {...lesson}>
          <div className="absolute top-0 left-0 size-full" />
        </SchedulePopover>
      </div>

      <ScheduleLessonResizer lesson={lesson} />
    </Lesson>
  )
}
