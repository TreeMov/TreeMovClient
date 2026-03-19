import type { ScheduleEventProps } from './types'

import { useDraggable } from '@dnd-kit/react'
import React from 'react'

import { useEventPosition } from '../../hooks'
import { ScheduleEventResizer } from '../schedule-event-resizer'
import { SchedulePopover } from '../schedule-popover'
import { Event } from '../ui'

export const ScheduleEvent: React.FC<ScheduleEventProps> = ({
  group,
  event,
}) => {
  const { id, start_time, end_time, date, state } = event
  const { getEventPosition } = useEventPosition(new Date(date))

  const { ref } = useDraggable({
    id,
    data: event,
    disabled: state === 'resize',
  })

  return (
    <Event
      style={getEventPosition(start_time, end_time)}
      isActive={state === 'active'}
      isDrag={state === 'drag'}
      event={event}
      group={group}
    >
      <div ref={ref} className="absolute top-0 left-0 size-full">
        <SchedulePopover {...event}>
          <div className="absolute top-0 left-0 size-full" />
        </SchedulePopover>
      </div>

      <ScheduleEventResizer event={event} />
    </Event>
  )
}
