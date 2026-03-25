import { DragOverlay } from '@dnd-kit/react'
import React, { useEffect } from 'react'

import { Spinner } from '@/components/ui/spinner'
import { getWeekDays, getWeeks } from '@/utils/helpers/dates'
import { cn } from '@/utils/helpers/shadcn'

import { useSchedule } from '../../hooks'
import { ScheduleCol } from '../schedule-col'
import { ScheduleColEvents } from '../schedule-col-events'
import { ScheduleContentWrapper } from '../schedule-content-wrapper'
import { ScheduleDndProvider } from '../schedule-dnd-provider'
import { ScheduleHeader } from '../schedule-header'
import { ScheduleHoursCol } from '../schedule-hours-col'
import { ScheduleMonthCell } from '../schedule-month-cell'

export const ScheduleContent: React.FC = () => {
  const {
    store,
    events,
    selectedDate,
    contentRef,
    isLoading,
    view,
    days,
  } = useSchedule()

  const weeks = getWeeks(selectedDate)

  useEffect(() => {
    store.syncEvents(events)
  }, [events, store])

  return (
    <ScheduleContentWrapper>
      <ScheduleHeader />
      <div
        className={cn({
          'grid grid-cols-[1fr_7fr]': view !== 'month',
        })}
      >
        {view !== 'month' && (
          <ScheduleHoursCol className="not-last:border-grey-200 not-last:border-r" />
        )}
        <ScheduleDndProvider>
          <div
            ref={contentRef}
            className={cn({
              'relative grid grid-cols-7':
                view !== 'day' && view !== 'month',
            })}
          >
            {view !== 'month'
              ? days.map((day) => (
                  <ScheduleColEvents
                    key={day.getTime()}
                    className="not-last:border-grey-200 not-last:border-r"
                    day={day}
                  >
                    <ScheduleCol date={day} />
                  </ScheduleColEvents>
                ))
              : weeks.map((week) => (
                  <div
                    key={week.getTime()}
                    className="grid grid-cols-7"
                  >
                    {getWeekDays(week).map((day) => (
                      <ScheduleMonthCell
                        key={day.getTime()}
                        day={day}
                      />
                    ))}
                  </div>
                ))}
          </div>
          <DragOverlay dropAnimation={null}>{null}</DragOverlay>
        </ScheduleDndProvider>
      </div>
      {isLoading && (
        <div className="bg-grey-500/20 absolute top-0 left-0 z-20 flex size-full items-center justify-center">
          <Spinner className="size-16 text-violet-400" />
        </div>
      )}
    </ScheduleContentWrapper>
  )
}
