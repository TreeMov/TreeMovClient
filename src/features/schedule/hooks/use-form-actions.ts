import type { SubmitHandler } from 'react-hook-form'
import type { Schema } from '@/features/schedule/components/ui/form/components/event-form/types'
import type { OutputSchema } from '@/features/schedule/components/ui/form/components/lesson-form/types'
import type { MaybePromise } from '@/types/utility'
import type { PeriodEnum } from '../components/ui/form'

import {
  type LessonModelCreate,
  type PeriodLessonModelCreate,
} from '@/api/generated/core'

export type UseFormActionsParams = {
  date: string
  onCreatePeriod: (
    dto: Omit<PeriodLessonModelCreate, 'period'>,
    period: PeriodEnum
  ) => MaybePromise<unknown>
  onCreate: (data: LessonModelCreate) => MaybePromise<unknown>
}

export const useFormActions = ({
  date,
  onCreate,
  onCreatePeriod,
}: UseFormActionsParams) => {
  const onSubmitEvent: SubmitHandler<Schema> = async ({
    start_time,
    end_time,
    title,
    period,
    periodDateRange,
  }) => {
    if (period && periodDateRange) {
      const { from, to } = periodDateRange
      await onCreatePeriod(
        {
          start_time,
          end_time,
          start_date: from,
          repeat_lessons_until_date: to,
          title,
        },
        period
      )
    } else {
      await onCreate({ date, start_time, end_time, title })
    }
  }

  const onSubmitLesson: SubmitHandler<OutputSchema> = async ({
    period,
    periodDateRange,
    start_time,
    end_time,
    subject,
    teacher,
    classroom,
    student_group,
    comment,
  }) => {
    const fields: Pick<
      LessonModelCreate,
      | 'subject_id'
      | 'teacher_id'
      | 'classroom_id'
      | 'student_group_id'
      | 'comment'
    > = {
      subject_id: +subject,
      teacher_id: +teacher,
      classroom_id: +classroom,
      student_group_id: +student_group,
      comment,
    }

    if (period && periodDateRange) {
      const { from, to } = periodDateRange
      await onCreatePeriod(
        {
          start_time,
          end_time,
          start_date: from,
          repeat_lessons_until_date: to,
          ...fields,
        },
        period
      )
    } else {
      await onCreate({
        date,
        start_time,
        end_time,
        ...fields,
      })
    }
  }

  return { onSubmitEvent, onSubmitLesson }
}
