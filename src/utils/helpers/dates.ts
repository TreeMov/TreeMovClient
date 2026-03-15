import {
  addDays,
  eachDayOfInterval,
  eachHourOfInterval,
  startOfDay,
  startOfWeek,
} from 'date-fns'

export const getWeekDays = () =>
  eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: addDays(startOfWeek(new Date()), 6),
  })

export const getDayHours = (start?: Date, end?: Date) =>
  eachHourOfInterval({
    start: start ?? startOfDay(new Date()),
    end: end ?? startOfDay(new Date()),
  })
