import { addMinutes, endOfHour, format, startOfHour } from 'date-fns'

import { dateFormat, timeFormat } from '../../constants'
import { useMouseEvents, useSchedule } from '../../hooks'
import { Cell } from '../ui'

export const ScheduleCol: React.FC<{ date: Date }> = ({ date }) => {
  const { store, hours } = useSchedule()

  const { getMouseDate } = useMouseEvents()

  const onMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const lessonDate = getMouseDate(date, e.clientY)

    if (!lessonDate) {
      return
    }

    store.createLesson({
      date: format(lessonDate, dateFormat),
      start_time: format(startOfHour(lessonDate), timeFormat),
      end_time: format(
        addMinutes(endOfHour(lessonDate), 1),
        timeFormat
      ),
      state: 'normal',
    })
  }

  return hours.map((hour) => (
    <Cell
      key={hour.getTime()}
      className="not-last:border-grey-200 relative h-24 not-last:border-b"
      onMouseDown={onMouseDown}
    />
  ))
}
