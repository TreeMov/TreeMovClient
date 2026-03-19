import type { ScheduleEvent } from '../../types'

import { DragOverlay } from '@dnd-kit/react'
import React from 'react'

import { Event } from '../ui'

const OverLayInner: React.FC<{
  data: Record<string, unknown>
  element: Element | undefined
}> = ({ data, element }) => {
  const rect = element?.getBoundingClientRect()

  return (
    <Event
      className="opacity-0"
      event={data as ScheduleEvent}
      style={{ width: rect?.width, height: rect?.height }}
    />
  )
}

export const ScheduleEventOverlay: React.FC = () => {
  return (
    <DragOverlay dropAnimation={null}>
      {({ data, element }) => (
        <OverLayInner data={data} element={element} />
      )}
    </DragOverlay>
  )
}
