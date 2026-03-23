import type { ContentProps } from './types'

import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isWeekend,
  parseISO,
  startOfWeek,
} from 'date-fns'
import React from 'react'

import {
  type LessonModelCreate,
  type LessonModelUpdate,
  type PeriodLessonModelCreate,
  useCreateLessons,
  useCreatePeriodLessonLessons,
  useLessons,
  useLessons2,
  useUpdateStudentsLessonsId,
} from '@/api/generated/core'
import {
  dateFormat,
  getScheduleHours,
  Schedule,
} from '@/features/schedule'
import { PeriodEnum } from '@/features/schedule/components/forms/lesson-form/types'
import { getWeekDays } from '@/utils/helpers/dates'

import { scheduleConfig } from '../../constants'

export const Content: React.FC<ContentProps> = ({ date }) => {
  const { mutateAsync: deleteEvent } = useLessons2()
  const { mutateAsync: updateEvent } = useUpdateStudentsLessonsId()
  const { mutateAsync: createEvent } = useCreateLessons()
  const { mutateAsync: createPeriod } = useCreatePeriodLessonLessons()
  const {
    data: events,
    isPending,
    refetch,
  } = useLessons({
    date_max: format(endOfWeek(date), dateFormat),
    date_min: format(startOfWeek(date), dateFormat),
  })

  const onChange = async (id: number, data: LessonModelUpdate) => {
    await updateEvent({
      id,
      data,
    })
    await refetch()
  }

  const onDelete = async (id: number) => {
    await deleteEvent({ params: { id } })
    await refetch()
  }

  const onCreate = async (data: LessonModelCreate) => {
    await createEvent({ data })
    await refetch()
  }

  const onCreatePeriod = async (
    dto: Omit<PeriodLessonModelCreate, 'period'>,
    period: PeriodEnum
  ) => {
    switch (period) {
      case PeriodEnum.DAILY:
        await createPeriod({ data: { ...dto, period: 1 } })
        break
      case PeriodEnum.WEEKLY:
        await createPeriod({ data: { ...dto, period: 7 } })
        break
      case PeriodEnum.WEEKDAYS: {
        const startDate = parseISO(dto.start_date)
        const endDate = parseISO(dto.repeat_lessons_until_date)
        const weekdaysByDay = new Map<number, string>()

        for (const day of eachDayOfInterval({
          start: startDate,
          end: endDate,
        })) {
          if (isWeekend(day)) {
            continue
          }

          const weekDay = day.getDay()
          if (weekdaysByDay.has(weekDay)) {
            continue
          }

          weekdaysByDay.set(weekDay, format(day, dateFormat))
        }

        await Promise.all(
          [...weekdaysByDay.values()].map((startDateValue) =>
            createPeriod({
              data: { ...dto, start_date: startDateValue, period: 7 },
            })
          )
        )
        break
      }
    }
    await refetch()
  }

  return (
    <Schedule
      config={scheduleConfig}
      events={events ?? []}
      isLoading={isPending}
      days={getWeekDays(new Date(date))}
      hours={getScheduleHours()}
      onChange={onChange}
      onDelete={onDelete}
      onCreate={onCreate}
      onCreatePeriod={onCreatePeriod}
    />
  )
}
