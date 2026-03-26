import type { ScheduleEvent } from '../../types'

import { useDraggable } from '@dnd-kit/react'
import React from 'react'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { cn } from '@/utils/helpers/shadcn'

import { SchedulePopover } from '../schedule-popover'
import { EventCard } from '../ui/event-card'

export const ScheduleEventPreview: React.FC<ScheduleEvent> = ({
  className,
  ...event
}) => {
  const { id, state } = event

  const { ref } = useDraggable({
    id,
    data: event,
    disabled: state === 'resize',
  })

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <SchedulePopover {...event}>
        <HoverCardTrigger
          className={cn('size-4', className)}
          data-event-preview
        >
          <button
            ref={ref}
            style={{ backgroundColor: event.color }}
            className="flex size-full cursor-pointer items-center justify-center rounded-sm"
          />
        </HoverCardTrigger>
      </SchedulePopover>
      <HoverCardContent>
        <EventCard event={event} />
      </HoverCardContent>
    </HoverCard>
  )
}
