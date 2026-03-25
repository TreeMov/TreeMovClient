import type { ScheduleMonthCellProps } from './types'

import { useDroppable } from '@dnd-kit/react'
import { format, getMonth, isSameDay } from 'date-fns'
import React from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { dateFormat } from '../../constants'
import { useSchedule } from '../../hooks'
import { ScheduleDialog } from '../schedule-dialog'
import { ScheduleEventPreview } from '../schedule-event-preview'
import { Cell } from '../ui'

export const ScheduleMonthCell: React.FC<ScheduleMonthCellProps> = ({
  day,
}) => {
  const {
    store,
    selectedDate,
    onClickCell,
    onCreate,
    onCreatePeriod,
  } = useSchedule()

  const events = store.events.filter(({ date }) =>
    isSameDay(date, day)
  )

  const { ref, isDropTarget } = useDroppable({
    id: format(day, dateFormat),
  })

  return (
    <Cell
      ref={ref}
      className={cn(
        'border-grey-200 relative aspect-video flex-col justify-start border-b px-2.5 pb-2.5 not-last:border-r',
        {
          'text-grey-400': getMonth(selectedDate) !== getMonth(day),
          'inset-ring-1 inset-ring-violet-400': isDropTarget,
        }
      )}
    >
      <button
        className="hover:after:bg-grey-200 relative z-10 aspect-square cursor-pointer p-2.5 transition-colors after:absolute after:top-1/2 after:left-1/2 after:size-8 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full"
        onClick={() => onClickCell?.(day)}
      >
        <span className="relative z-10">{format(day, 'd')}</span>
      </button>
      <div className="relative z-10 flex gap-1 self-start">
        {events.map((event) => (
          <ScheduleEventPreview key={event.id} {...event} />
        ))}
      </div>
      <ScheduleDialog
        date={format(day, dateFormat)}
        onCreate={onCreate}
        onCreatePeriod={onCreatePeriod}
      >
        <div className="absolute top-0 left-0 size-full" />
      </ScheduleDialog>
    </Cell>
  )
}
