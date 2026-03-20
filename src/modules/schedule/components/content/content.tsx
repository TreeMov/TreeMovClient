import type { ContentProps } from './types'

import { endOfWeek, format, startOfWeek } from 'date-fns'
import React from 'react'

import {
  type LessonModelRead,
  useCreateLessons,
  useLessons,
  useLessons2,
  useUpdateStudentsLessonsId,
} from '@/api/generated/core'
import {
  dateFormat,
  deserializeEvent,
  getScheduleHours,
  type OnChangeParams,
  type OnDeleteParams,
  Schedule,
} from '@/features/schedule'
import { getWeekDays } from '@/utils/helpers/dates'

import { scheduleConfig } from '../../constants'

export const Content: React.FC<ContentProps> = ({ date }) => {
  const { mutateAsync: deleteEvent } = useLessons2()
  const { mutateAsync: updateEvent } = useUpdateStudentsLessonsId()
  const { mutateAsync: createEvent } = useCreateLessons()
  const {
    data: events,
    isPending,
    refetch,
  } = useLessons({
    date_max: format(endOfWeek(date), dateFormat),
    date_min: format(startOfWeek(date), dateFormat),
  })

  const onChange = async ({
    dto,
    type,
  }: OnChangeParams): Promise<LessonModelRead[] | undefined> => {
    switch (type) {
      case 'update':
        await updateEvent({
          id: dto.id,
          data: {
            ...dto,
            ...deserializeEvent(dto),
          },
        })
        break
      case 'create':
        await createEvent({
          data: deserializeEvent(dto),
        })
        break
    }
    const { data } = await refetch()
    return data
  }

  const onDelete = async ({ type, id }: OnDeleteParams) => {
    if (type === 'update') {
      await deleteEvent({ params: { id } })
      const { data } = await refetch()
      return data
    }
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
    />
  )
}
