import { DragOverlay } from '@dnd-kit/react'
import React, { useEffect } from 'react'

import { Spinner } from '@/components/ui/spinner'

import { useSchedule } from '../../hooks'
import { ScheduleCol } from '../schedule-col'
import { ScheduleColLessons } from '../schedule-col-lessons'
import { ScheduleContentWrapper } from '../schedule-content-wrapper'
import { ScheduleDndProvider } from '../schedule-dnd-provider'
import { ScheduleHeader } from '../schedule-header'
import { ScheduleHoursCol } from '../schedule-hours-col'

export const ScheduleContent: React.FC = () => {
  const { store, lessons, contentRef, days, isLoading } =
    useSchedule()

  useEffect(() => {
    store.syncLessons(lessons)
  }, [lessons, store])

  return (
    <ScheduleContentWrapper>
      <ScheduleHeader />
      <div className="grid grid-cols-[1fr_7fr]">
        <ScheduleHoursCol className="not-last:border-grey-200 not-last:border-r" />
        <ScheduleDndProvider>
          <div ref={contentRef} className="relative grid grid-cols-7">
            {days.map((day) => (
              <ScheduleColLessons
                key={day.getTime()}
                className="not-last:border-grey-200 not-last:border-r"
                day={day}
              >
                <ScheduleCol date={day} />
              </ScheduleColLessons>
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
