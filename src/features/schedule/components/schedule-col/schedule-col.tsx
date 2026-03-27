import { addMinutes, endOfHour, format, startOfHour } from 'date-fns'
import React, { useCallback } from 'react'

import { dateFormat, timeFormat } from '../../constants'
import {
  useMouseEvents,
  useScheduleStoreContext,
  useScheduleTime,
} from '../../hooks'
import { Cell } from '../ui'

const ScheduleColComponent: React.FC<{ date: Date }> = ({ date }) => {
  const { store } = useScheduleStoreContext()
  const { hours } = useScheduleTime()

  const { getMouseDate } = useMouseEvents()

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const eventDate = getMouseDate(date, e.clientY)

      if (!eventDate) {
        return
      }

      store.createEvent({
        date: format(eventDate, dateFormat),
        start_time: format(startOfHour(eventDate), timeFormat),
        end_time: format(
          addMinutes(endOfHour(eventDate), 1),
          timeFormat
        ),
        state: 'normal',
      })
    },
    [date, getMouseDate, store]
  )

  return hours.map((hour) => (
    <Cell
      key={hour.getTime()}
      className="not-last:border-grey-200 relative h-24 not-last:border-b"
      onMouseDown={onMouseDown}
    />
  ))
}

export const ScheduleCol = React.memo(ScheduleColComponent)
