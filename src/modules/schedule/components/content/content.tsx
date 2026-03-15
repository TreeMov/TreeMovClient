import type { ContentProps } from './types'

import React from 'react'

import {
  type LessonModelRead,
  useLessons,
  useUpdateStudentsLessonsId,
} from '@/api/generated/core'
import { Schedule } from '@/components/shared/schedule'

import { scheduleConfig } from '../../constants'

export const Content: React.FC<ContentProps> = ({
  date_max,
  date_min,
}) => {
  const { mutateAsync: updateLesson } = useUpdateStudentsLessonsId()
  const {
    data: lessons,
    isPending,
    refetch,
  } = useLessons({ date_max, date_min })

  const onChange = async (
    dto: LessonModelRead
  ): Promise<LessonModelRead[] | undefined> => {
    await updateLesson({ id: dto.id, data: dto })
    const { data } = await refetch()
    return data
  }

  if (isPending || !lessons) {
    return null
  }

  return (
    <Schedule
      config={scheduleConfig}
      lessons={lessons}
      onChange={onChange}
    />
  )
}
