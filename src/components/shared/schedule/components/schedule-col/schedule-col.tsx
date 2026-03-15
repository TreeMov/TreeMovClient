import type { ScheduleLessonCreate } from '../../types'

import { addMinutes, endOfHour, format, startOfHour } from 'date-fns'

import { dateFormat, timeFormat } from '../../constants'
import { useContentOverlay, useSchedule } from '../../hooks'
import { Cell } from '../ui'

export const ScheduleCol: React.FC<{ date: Date }> = ({ date }) => {
  const { store } = useSchedule()

  const { getMouseDate } = useContentOverlay()

  const onMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const lessonDate = getMouseDate(date, e.clientY)

    if (!lessonDate) {
      return
    }

    const nextLesson: ScheduleLessonCreate = {
      id: Math.random(),
      type: 'create',
      date: format(lessonDate, dateFormat),
      start_time: format(startOfHour(lessonDate), timeFormat),
      end_time: format(
        addMinutes(endOfHour(lessonDate), 1),
        timeFormat
      ),
      title: '',
      teacher: undefined,
      classroom: undefined,
      student_group: undefined,
      subject: undefined,
      comment: undefined,
      is_canceled: false,
      is_completed: false,
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
