import type { ScheduleEventProps } from './types'

import { useDraggable } from '@dnd-kit/react'
import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'

import { useEventPosition } from '../../hooks'
import { ScheduleEventResizer } from '../schedule-event-resizer'
import { SchedulePopover } from '../schedule-popover'
import { Event } from '../ui'

const ScheduleEventComponent: React.FC<ScheduleEventProps> = ({
  group,
  event,
}) => {
  const { id, start_time, end_time, date, state } = event
  const { getEventPosition } = useEventPosition(new Date(date))
  const position = useMemo(
    () => getEventPosition(start_time, end_time),
    [end_time, getEventPosition, start_time]
  )

  const { ref } = useDraggable({
    id,
    data: event,
    disabled: state === 'resize',
  })

  return (
    <Event
      style={position}
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

      {state === 'resize' &&
        createPortal(
          <>
            <style>{` * { cursor: n-resize !important; } `}</style>
            <style>{` * { user-select: none !important; -webkit-user-select: none !important; } `}</style>
          </>,
          document.head
        )}
    </Event>
  )
}

export const ScheduleEvent = React.memo(ScheduleEventComponent)
