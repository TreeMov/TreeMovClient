import type { ScheduleLesson } from '../../types'

import { DragOverlay } from '@dnd-kit/react'
import React from 'react'

import { Lesson } from '../ui'

const OverLayInner: React.FC<{
  data: Record<string, unknown>
  element: Element | undefined
}> = ({ data, element }) => {
  const rect = element?.getBoundingClientRect()

  return (
    <Lesson
      className="opacity-0"
      lesson={data as ScheduleLesson}
      style={{ width: rect?.width, height: rect?.height }}
    />
  )
}

export const ScheduleLessonOverlay: React.FC = () => {
  return (
    <DragOverlay dropAnimation={null}>
      {({ data, element }) => (
        <OverLayInner data={data} element={element} />
      )}
    </DragOverlay>
  )
}
