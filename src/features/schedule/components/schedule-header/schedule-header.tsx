import { format } from 'date-fns'
import React from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { useSchedule } from '../../hooks'
import { Cell } from '../ui'

export const ScheduleHeader: React.FC = () => {
  const { config, view, days, onClickCell } = useSchedule()
  const { dayFormat } = config

  return (
    <div className="bg-background border-grey-200 sticky top-0 z-20 grid w-full grid-cols-[1fr_7fr] overflow-hidden border-b">
      <Cell className="border-grey-200 h-11 border-r">Часы</Cell>
      <div
        className={cn('w-full', {
          'grid grid-cols-7': view !== 'day',
        })}
      >
        {days.map((day) => (
          <Cell
            asChild
            key={day.getTime()}
            className="not-last:border-grey-200 h-11 cursor-pointer bg-violet-100 transition-colors not-last:border-r hover:bg-violet-300 hover:text-white disabled:cursor-auto disabled:bg-violet-100 disabled:text-black"
            onClick={() => onClickCell?.(day)}
          >
            <button disabled={view === 'day'}>
              {format(day, dayFormat)}
            </button>
          </Cell>
        ))}
      </div>
    </div>
  )
}
