import { format } from 'date-fns'
import React from 'react'

import { timeFormat } from '../../constants'
import { useSchedule } from '../../hooks'
import { Cell } from '../ui'

export const ScheduleHoursCol: React.FC<
  React.ComponentProps<'div'>
> = ({ className, ...props }) => {
  const { store } = useSchedule()

  return (
    <div className={className} {...props}>
      {store.hours.map((hour) => (
        <Cell
          key={hour.getTime()}
          className="not-last:border-grey-200 h-24 not-last:border-b"
        >
          {format(hour, timeFormat)}
        </Cell>
      ))}
    </div>
  )
}
