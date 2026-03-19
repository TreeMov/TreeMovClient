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
  deserealizeLesson,
  getScheduleHours,
  type OnChangeParams,
  type OnDeleteParams,
  Schedule,
} from '@/features/schedule'
import { getWeekDays } from '@/utils/helpers/dates'

import { scheduleConfig } from '../../constants'

export const Content: React.FC<ContentProps> = ({ date }) => {
  const { mutateAsync: deleteLesson } = useLessons2()
  const { mutateAsync: updateLesson } = useUpdateStudentsLessonsId()
  const { mutateAsync: createLesson } = useCreateLessons()
  const {
    data: lessons,
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
        await updateLesson({
          id: dto.id,
          data: {
            ...dto,
            ...deserealizeLesson(dto),
          },
        })
        break
      case 'create':
        await createLesson({
          data: deserealizeLesson(dto),
        })
        break
    }
    const { data } = await refetch()
    return data
  }

  const onDelete = async ({ type, id }: OnDeleteParams) => {
    if (type === 'update') {
      await deleteLesson({ params: { id } })
      const { data } = await refetch()
      return data
    }
  }

  return (
    <Schedule
      config={scheduleConfig}
      lessons={lessons ?? []}
      isLoading={isPending}
      days={getWeekDays(new Date(date))}
      hours={getScheduleHours()}
      onChange={onChange}
      onDelete={onDelete}
    />
  )
}
