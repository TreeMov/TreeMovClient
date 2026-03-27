import type { ScheduleEvent as ScheduleEventType } from '../../types'

import { useDroppable } from '@dnd-kit/react'
import { format } from 'date-fns'
import React, { useMemo } from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { dateFormat } from '../../constants'
import { useScheduleStore } from '../../hooks'
import { ScheduleEvent } from '../schedule-event'
import { ScheduleEventDroppable } from '../schedule-event-droppable'

import { getEventGroups } from './helpers'

const ScheduleColEventsComponent: React.FC<
  React.ComponentProps<'div'> & {
    day: Date
    events: ScheduleEventType[]
  }
> = ({ day, events, className, children, ...props }) => {
  const dragEvent = useScheduleStore((store) => store.dragEvent)

  const { ref, isDropTarget } = useDroppable({
    id: format(day, dateFormat),
  })
  const eventGroups = useMemo(() => getEventGroups(events), [events])

  return (
    <div ref={ref} className={cn('relative', className)} {...props}>
      {children}
      {isDropTarget && dragEvent && (
        <ScheduleEventDroppable day={day} events={dragEvent} />
      )}
      {events.map((event) => (
        <ScheduleEvent
          key={event.id}
          event={event}
          group={eventGroups.get(event.id) ?? 0}
        />
      ))}
    </div>
  )
}

export const ScheduleColEvents = React.memo(
  ScheduleColEventsComponent
)
