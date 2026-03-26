import { useDroppable } from '@dnd-kit/react'
import { format, isSameDay } from 'date-fns'
import React, { useMemo } from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { dateFormat } from '../../constants'
import { useSchedule } from '../../hooks'
import { ScheduleEvent } from '../schedule-event'
import { ScheduleEventDroppable } from '../schedule-event-droppable'

import { getEventGroups } from './helpers'

export const ScheduleColEvents: React.FC<
  React.ComponentProps<'div'> & { day: Date }
> = ({ day, className, children, ...props }) => {
  const { store } = useSchedule()

  const { ref, isDropTarget } = useDroppable({
    id: format(day, dateFormat),
  })

  const events = store.events.filter(({ date }) =>
    isSameDay(date, day)
  )
  const eventGroups = useMemo(() => getEventGroups(events), [events])

  return (
    <div ref={ref} className={cn('relative', className)} {...props}>
      {children}
      {isDropTarget && store.dragEvent && (
        <ScheduleEventDroppable day={day} events={store.dragEvent} />
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
