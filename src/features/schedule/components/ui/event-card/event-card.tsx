import type { EventCardProps } from './types'

import { format } from 'date-fns'
import React from 'react'

import { timeFormat } from '@/features/schedule/constants'
import { combineDateAndTime } from '@/features/schedule/helpers'
import { cn } from '@/utils/helpers/shadcn'

import { EventContent } from '../event-content'

export const EventCard: React.FC<
  React.PropsWithChildren<EventCardProps>
> = ({
  event,
  className,
  isActive,
  isDrag,
  style,
  children,
  ...props
}) => {
  const { id, date, start_time, end_time, color } = event

  return (
    <div
      className={cn(
        'z-10 w-full rounded-xl border bg-white p-2.5 shadow-lg transition-shadow',
        {
          'z-15 shadow-2xl': isActive,
          'opacity-60': isDrag,
        },
        className
      )}
      style={{
        borderColor: color,
        ...style,
      }}
      {...props}
    >
      <div>{event.state}</div>
      <div>{event.type}</div>
      <div>{id}</div>
      {event.type === 'create' ? (
        <div>Добавление</div>
      ) : (
        <EventContent {...event} />
      )}

      <div>
        {format(combineDateAndTime(date, start_time), timeFormat)}-
        {format(combineDateAndTime(date, end_time), timeFormat)}
      </div>

      {children}
    </div>
  )
}
