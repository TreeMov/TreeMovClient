import type { LessonModelRead } from '@/api/generated/core'

import { addMinutes, format } from 'date-fns'

import { dateFormat } from '../../constants'
import { useContentOverlay, useSchedule } from '../../hooks'
import { Cell } from '../ui'

export const ScheduleCol: React.FC<{ date: Date }> = ({ date }) => {
  const { store, config } = useSchedule()
  const { segmentSize } = config

  const { getMouseDate } = useContentOverlay()

  const onMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const lessonDate = getMouseDate(date, e.clientY)

    if (!lessonDate) {
      return
    }

    const nextLesson: LessonModelRead = {
      id: Math.random(),
      classroom: {
        id: 23,
        building: 'ewq',
        floor: 2,
        title: 'ewqewq',
      },
      date: format(lessonDate, dateFormat),
      duration: '2',
      start_time: format(lessonDate, 'HH:mm'),
      end_time: format(addMinutes(lessonDate, segmentSize), 'HH:mm'),
      is_canceled: false,
      is_completed: false,
      student_group: { id: 23, title: 'eqw' },
      subject: { id: 23, color: '#fff', title: 'ewq' },
      teacher: {
        id: 23,
        employee: { id: 43, email: 'ewqeq@ma.ru', name: '323' },
      },
      title: 'ewqeq',
      week_day: 2,
    }

    store.createLesson(nextLesson)
  }

  return (
    <div onMouseDown={onMouseDown}>
      {store.hours.map((hour) => (
        <Cell
          key={hour.getTime()}
          className="not-last:border-grey-200 relative h-24 not-last:border-b"
        />
      ))}
    </div>
  )
}
