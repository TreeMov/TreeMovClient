import type { ScheduleEventRead } from '@/features/schedule/types'

import React from 'react'

export const EventContent: React.FC<ScheduleEventRead> = (event) => {
  switch (event.formType) {
    case 'lesson':
      return (
        <div>
          <div>{event.subject.label}</div>
          <div>{event.teacher.label}</div>
          <div>{event.classroom.label}</div>
          <div>{event.student_group.label}</div>
        </div>
      )
    case 'event':
      return <div>{event.title}</div>
  }
}
