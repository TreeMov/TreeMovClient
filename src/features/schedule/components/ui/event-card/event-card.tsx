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
  const { date, start_time, end_time, color } = event

  return (
    <div
      className={cn(
        'text-grey-600 z-10 w-full rounded-2xl border bg-white shadow-lg transition-shadow',
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
      <div className="flex h-full flex-col gap-1 overflow-hidden p-2.5">
        {event.type === 'create' ? (
          <div>Добавление</div>
        ) : (
          <EventContent {...event} />
        )}
        <div>
          {format(combineDateAndTime(date, start_time), timeFormat)}
          <span>-</span>
          {format(combineDateAndTime(date, end_time), timeFormat)}
        </div>
      </div>

      {children}
    </div>
  )
}
