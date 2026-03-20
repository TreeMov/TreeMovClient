import type { EventProps } from './types'

import { format } from 'date-fns'
import React, { useMemo } from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { timeFormat } from '../../../constants'
import { combineDateAndTime } from '../../../helpers'
import { EventContent } from '../event-content'

import { GROUP_OFFSET } from './constants'

export const Event: React.FC<EventProps> = ({
  className,
  isActive,
  isDrag,
  isDrop,
  children,
  event,
  style,
  group,
  ...props
}) => {
  const { id, date, start_time, end_time, color, state } = event

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
    <div
      className={cn(
        'absolute left-0 z-10 w-full cursor-pointer rounded-xl border bg-white p-2.5 shadow-lg transition-shadow',
        {
          'z-15 shadow-2xl': isActive,
          'opacity-60': isDrag,
        },
        className
      )}
      style={{
        borderColor: color,
        width,
        left,
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
