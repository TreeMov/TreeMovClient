import type { EventProps } from './types'

import React, { useMemo } from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { EventCard } from '../event-card'

import { GROUP_WIDTH_DECAY, MIN_GROUP_WIDTH } from './constants'

export const Event: React.FC<EventProps> = ({
  className,
  isDrop,
  children,
  event,
  style,
  group,
  ...props
}) => {
  const { state } = event
  const groupIndex = group ?? 0

  const widthValue = useMemo(() => {
    if (isDrop) {
      return
    }

    if (state === 'normal' || state === 'active') {
      return (
        MIN_GROUP_WIDTH +
        (100 - MIN_GROUP_WIDTH) *
          Math.pow(GROUP_WIDTH_DECAY, groupIndex + 1)
      )
    }
  }, [groupIndex, isDrop, state])

  const width = widthValue ? `${widthValue}%` : undefined
  const zIndex = useMemo(() => {
    if (isDrop) {
      return
    }

    if (state === 'active') {
      return groupIndex + 100
    }

    if (state === 'normal') {
      return groupIndex + 1
    }
  }, [groupIndex, isDrop, state])

  return (
    <EventCard
      event={event}
      className={cn('absolute left-0 cursor-pointer', className)}
      style={{ width, zIndex, ...style }}
      {...props}
    >
      {children}
    </EventCard>
  )
}
