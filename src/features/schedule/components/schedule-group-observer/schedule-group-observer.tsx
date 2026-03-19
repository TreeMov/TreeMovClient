import type { ScheduleEvent } from '../../types'
import type { ScheduleGroupObserverProps } from './types'

import { isAfter, isBefore } from 'date-fns'
import React, { useMemo } from 'react'

import { combineDateAndTime } from '../../helpers'

export const ScheduleGroupObserver: React.FC<
  ScheduleGroupObserverProps
> = ({ events, event, children }) => {
  const group = useMemo<ScheduleEvent[]>(
    () =>
      events.filter(
        ({ date, start_time, end_time }) =>
          isBefore(
            combineDateAndTime(date, start_time),
            combineDateAndTime(event.date, event.start_time)
          ) &&
          isAfter(
            combineDateAndTime(date, end_time),
            combineDateAndTime(event.date, event.start_time)
          )
      ),
    [event.date, event.start_time, events]
  )

  return children(group.length)
}
