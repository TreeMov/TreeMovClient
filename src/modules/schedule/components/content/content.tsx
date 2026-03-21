import type { ContentProps } from './types'

import { endOfWeek, format, startOfWeek } from 'date-fns'
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

  const onCreatePeriod = async (data: PeriodLessonModelCreate) => {
    await createPeriod({ data })
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
