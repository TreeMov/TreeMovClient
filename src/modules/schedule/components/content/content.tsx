import type { OnChangeParams } from '@/components/shared/schedule/types'
import type { ContentProps } from './types'

import { endOfWeek, format, startOfWeek } from 'date-fns'
import React from 'react'

import {
  type LessonModelRead,
  useCreateLessons,
  useLessons,
  useUpdateStudentsLessonsId,
} from '@/api/generated/core'
import { Schedule } from '@/components/shared/schedule'
import { dateFormat } from '@/components/shared/schedule/constants'
import {
  deserealizeLesson,
  getScheduleHours,
} from '@/components/shared/schedule/helpers'
import { getWeekDays } from '@/utils/helpers/dates'

import { scheduleConfig } from '../../constants'

export const Content: React.FC<ContentProps> = ({ date }) => {
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
      case 'read':
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

  return (
    <Schedule
      config={scheduleConfig}
      lessons={lessons ?? []}
      isLoading={isPending}
      onChange={onChange}
      days={getWeekDays(new Date(date))}
      hours={getScheduleHours()}
    />
  )
}
