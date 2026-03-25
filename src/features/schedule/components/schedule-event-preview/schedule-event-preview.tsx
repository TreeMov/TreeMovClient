import type { ScheduleEvent } from '../../types'

import { useDraggable } from '@dnd-kit/react'
import React from 'react'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

import { SchedulePopover } from '../schedule-popover'
import { EventCard } from '../ui/event-card'

export const ScheduleEventPreview: React.FC<ScheduleEvent> = (
  event
) => {
  const { id, state } = event

  const { ref } = useDraggable({
    id,
    data: event,
    disabled: state === 'resize',
  })

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <SchedulePopover {...event}>
        <HoverCardTrigger>
          <button
            ref={ref}
            style={{ backgroundColor: event.color }}
            className="size-4 cursor-pointer rounded-sm"
          />
        </HoverCardTrigger>
      </SchedulePopover>
      <HoverCardContent>
        <EventCard event={event} />
      </HoverCardContent>
    </HoverCard>
  )
}
