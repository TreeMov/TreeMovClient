import { format } from 'date-fns'
import React from 'react'

import { useSchedule } from '../../hooks'
import { Cell } from '../ui'

export const ScheduleHeader: React.FC = () => {
  const { config, days } = useSchedule()
  const { dayFormat } = config

  return (
    <div className="bg-background border-grey-200 sticky top-0 z-20 grid w-full grid-cols-8 overflow-hidden border-b">
      <Cell className="border-grey-200 h-11 border-r">Часы</Cell>
      {days.map((day) => (
        <Cell
          key={day.getTime()}
          className="not-last:border-grey-200 h-11 bg-violet-100 not-last:border-r"
        >
          {format(day, dayFormat)}
        </Cell>
      ))}
    </div>
  )
}
