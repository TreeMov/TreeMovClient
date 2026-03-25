import type { EventProps } from './types'

import React, { useMemo } from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { EventCard } from '../event-card'

import { GROUP_OFFSET } from './constants'

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

  const widthValue = useMemo(() => {
    if (isDrop) {
      return
    }

    if (state === 'normal' || state === 'active') {
      return 100 - GROUP_OFFSET * ((group ?? 0) + 1)
    }
  }, [group, isDrop, state])

  const width = widthValue ? `${widthValue}%` : undefined
  const left = widthValue
    ? `${100 - (widthValue + GROUP_OFFSET)}%`
    : undefined

  return (
    <EventCard
      event={event}
      className={cn('absolute left-0 cursor-pointer', className)}
      style={{ width, left, ...style }}
      {...props}
    >
      {children}
    </EventCard>
  )
}
