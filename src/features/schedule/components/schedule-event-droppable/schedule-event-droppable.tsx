import type { ScheduleEventDroppableProps } from './types'

import { useMouse } from '@uidotdev/usehooks'
import React from 'react'

import { useDroppableEvent, useEventPosition } from '../../hooks'
import { Event } from '../ui'

export const ScheduleEventDroppable: React.FC<
  ScheduleEventDroppableProps
> = ({ day, events }) => {
  const [{ y }] = useMouse()

  const { getEventPosition } = useEventPosition(day)
  const { getEventRange } = useDroppableEvent()
  const range = getEventRange({
    day,
    y,
    start_time: events.start_time,
    end_time: events.end_time,
  })

  if (!range) {
    return null
  }

  const { startTime, endTime } = range
  return (
    <Event
      className="z-15"
      event={{ ...events, start_time: startTime, end_time: endTime }}
      isDrop
      style={getEventPosition(range.startTime, range.endTime)}
    />
  )
}
