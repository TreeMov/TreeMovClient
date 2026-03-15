import type { ScheduleLesson } from '@/components/shared/schedule/types'
import type { ContentProps } from './types'

import React from 'react'

import {
  type LessonModelRead,
  useCreateLessons,
  useLessons,
  useUpdateStudentsLessonsId,
} from '@/api/generated/core'
import { Schedule } from '@/components/shared/schedule'
import { deserealizeLesson } from '@/components/shared/schedule/helpers'

import { scheduleConfig } from '../../constants'

export const Content: React.FC<ContentProps> = ({
  date_max,
  date_min,
}) => {
  const { mutateAsync: updateLesson } = useUpdateStudentsLessonsId()
  const { mutateAsync: createLesson } = useCreateLessons()
  const { data: lessons, refetch } = useLessons({
    date_max,
    date_min,
  })

  const onChange = async (
    dto: ScheduleLesson
  ): Promise<LessonModelRead[] | undefined> => {
    const { type } = dto
    switch (type) {
      case 'resize':
        await updateLesson({
          id: dto.id,
          data: {
            ...dto,
            ...deserealizeLesson(dto),
          },
        })
        break
      case 'create':
        await createLesson({ data: deserealizeLesson(dto) })
        break
      default:
        return
    }
    const { data } = await refetch()
    return data
  }

  return (
    <Schedule
      config={scheduleConfig}
      lessons={lessons ?? []}
      onChange={onChange}
    />
  )
}
