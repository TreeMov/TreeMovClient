import {
  addDays,
  eachDayOfInterval,
  eachHourOfInterval,
  startOfDay,
  startOfWeek,
} from 'date-fns'

export const getWeekDays = (date?: Date) =>
  eachDayOfInterval({
    start: startOfWeek(date ?? new Date()),
    end: addDays(startOfWeek(date ?? new Date()), 6),
  })

export const getDayHours = (start?: Date, end?: Date) =>
  eachHourOfInterval({
    start: start ?? startOfDay(new Date()),
    end: end ?? startOfDay(new Date()),
  })
