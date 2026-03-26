import type { ScheduleEvent } from '../../types'

import { useDraggable } from '@dnd-kit/react'
import React, { useCallback, useState } from 'react'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { cn } from '@/utils/helpers/shadcn'

import { SchedulePopover } from '../schedule-popover'
import { EventCard } from '../ui/event-card'

const ScheduleEventPreviewComponent: React.FC<ScheduleEvent> = ({
  className,
  ...event
}) => {
  const { id, state } = event
  const [isHovered, setIsHovered] = useState(false)

  const { ref } = useDraggable({
    id,
    data: event,
    disabled: state === 'resize',
  })
  const onHoverChange = useCallback((open: boolean) => {
    setIsHovered(open)
  }, [])

  return (
    <HoverCard
      open={isHovered}
      openDelay={0}
      closeDelay={0}
      onOpenChange={onHoverChange}
    >
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
      {isHovered && (
        <HoverCardContent>
          <EventCard event={event} />
        </HoverCardContent>
      )}
    </HoverCard>
  )
}

export const ScheduleEventPreview = React.memo(
  ScheduleEventPreviewComponent
)
