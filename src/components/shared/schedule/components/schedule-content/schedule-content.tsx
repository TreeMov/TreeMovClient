import React, { useEffect } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

import { serializeLesson } from '../../helpers'
import { useSchedule } from '../../hooks'
import { ScheduleCol } from '../schedule-col'
import { ScheduleColLessons } from '../schedule-col-lessons'
import { ScheduleHeader } from '../schedule-header'
import { ScheduleHoursCol } from '../schedule-hours-col'

export const ScheduleContent: React.FC = () => {
  const { store, lessons, contentRef } = useSchedule()

  useEffect(() => {
    store.syncLessons(lessons.map(serializeLesson))
  }, [lessons, store])

  return (
    <ScrollArea className="border-grey-200 h-full rounded-xl border select-none">
      <ScheduleHeader />
      <div className="grid grid-cols-[1fr_7fr]">
        <ScheduleHoursCol className="not-last:border-grey-200 not-last:border-r" />
        <div ref={contentRef} className="grid grid-cols-7">
          {store.days.map((day) => (
            <ScheduleColLessons
              key={day.getTime()}
              className="not-last:border-grey-200 not-last:border-r"
              day={day}
            >
              <ScheduleCol date={day} />
            </ScheduleColLessons>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
