import {
  addDays,
  eachDayOfInterval,
  eachHourOfInterval,
  eachWeekOfInterval,
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
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
    end: end ?? endOfDay(new Date()),
  })

export const getWeeks = (date: Date | string) =>
  eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  })
