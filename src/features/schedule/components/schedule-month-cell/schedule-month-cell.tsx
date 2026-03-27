import type { ScheduleMonthCellProps } from './types'

import { useDroppable } from '@dnd-kit/react'
import { format, getMonth } from 'date-fns'
import React, { useCallback, useDeferredValue, useMemo } from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { dateFormat } from '../../constants'
import {
  useMonthCellObserver,
  useScheduleActions,
  useScheduleCalendar,
} from '../../hooks'
import { ScheduleDialog } from '../schedule-dialog'
import { ScheduleEventPreview } from '../schedule-event-preview'
import { Cell } from '../ui'

const ScheduleMonthCellComponent: React.FC<
  ScheduleMonthCellProps
> = ({ day, events }) => {
  const { selectedDate, onClickCell } = useScheduleCalendar()
  const { onCreate, onCreatePeriod } = useScheduleActions()
  const deferredEvents = useDeferredValue(events)
  const dayKey = useMemo(() => format(day, dateFormat), [day])
  const isOutsideSelectedMonth =
    getMonth(selectedDate) !== getMonth(day)
  const handleClickCell = useCallback(() => {
    onClickCell?.(day)
  }, [day, onClickCell])

  const { cellObserverRef, isOverflowedCell } =
    useMonthCellObserver(deferredEvents)

  const { ref, isDropTarget } = useDroppable({
    id: dayKey,
  })

  return (
    <Cell
      ref={ref}
      className={cn(
        'border-grey-200 relative grid aspect-16/12 grid-rows-[auto_1fr] justify-normal overflow-hidden border-b px-2.5 pb-2.5 not-last:border-r',
        {
          'inset-ring-1 inset-ring-violet-400': isDropTarget,
        }
      )}
    >
      <div className="w-full py-2.5">
        <div className="relative flex items-center justify-center">
          <button
            className={cn(
              'hover:bg-grey-200 relative z-10 size-8 cursor-pointer rounded-full transition-colors',
              {
                'text-grey-400': isOutsideSelectedMonth,
              }
            )}
            onClick={handleClickCell}
          >
            {format(day, 'd')}
          </button>
          {isOverflowedCell && (
            <button
              className="absolute top-0 right-0 z-10 cursor-pointer text-xs text-violet-400 transition-colors hover:text-violet-600"
              onClick={handleClickCell}
            >
              Показать все
            </button>
          )}
        </div>
      </div>
      <div
        ref={cellObserverRef}
        className="relative flex size-full flex-wrap gap-1 self-start justify-self-start overflow-hidden"
      >
        {deferredEvents.map((event) => (
          <ScheduleEventPreview
            key={event.id}
            className="relative z-10"
            {...event}
          />
        ))}
      </div>
      <ScheduleDialog
        date={dayKey}
        onCreate={onCreate}
        onCreatePeriod={onCreatePeriod}
      >
        <div className="absolute top-0 left-0 size-full" />
      </ScheduleDialog>
    </Cell>
  )
}

export const ScheduleMonthCell = React.memo(
  ScheduleMonthCellComponent
)
