import type { ScheduleEventRead } from '@/features/schedule/types'

import React from 'react'

export const EventContent: React.FC<ScheduleEventRead> = (event) => {
  const { color } = event

  switch (event.formType) {
    case 'lesson':
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <div
              className="size-4 rounded-sm"
              style={{ backgroundColor: color }}
            />
            <div className="text-lg text-black">
              {event.subject.label}
            </div>
          </div>
          <div>{event.teacher.label}</div>
          <div>{event.classroom.label}</div>
          <div>{event.student_group.label}</div>
        </div>
      )
    case 'event':
      return <div className="text-lg text-black">{event.title}</div>
  }
}
