import { format } from 'date-fns'
import {
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'

import {
  type LessonModelCreate,
  type LessonModelUpdate,
  type PeriodLessonModelCreate,
  useCreateLesson,
  useCreatePeriodLessonsV2,
  useDeleteLesson,
  useDeletePeriodLesson,
  useListLessons,
  useUpadateLesson,
  useUpadatePeriodLesson,
} from '@/api/generated/core'
import { dateFormat, type ScheduleView } from '@/features/schedule'
import { PeriodEnum } from '@/features/schedule/components/ui/form'

import { periodMap } from './constants'

export const useFilters = () => {
  const [queryFilters, setQueryFilter] = useQueryStates({
    date: parseAsString
      .withDefault(format(new Date(), dateFormat))
      .withOptions({ clearOnDefault: true }),
    view: parseAsStringEnum<ScheduleView>(['day', 'week', 'month'])
      .withDefault('week')
      .withOptions({ clearOnDefault: true }),
  })

  return { ...queryFilters, setQueryFilter }
}

export const useScheduleActions = ({
  refetch,
}: Pick<ReturnType<typeof useListLessons>, 'refetch'>) => {
  const { mutateAsync: deleteEvent } = useDeleteLesson()
  const { mutateAsync: updateEvent } = useUpadateLesson()
  const { mutateAsync: createEvent } = useCreateLesson()
  const { mutateAsync: deletePeriodLesson } = useDeletePeriodLesson()
  const { mutateAsync: updatePeriodLesson } = useUpadatePeriodLesson()
  const { mutateAsync: createPeriod } = useCreatePeriodLessonsV2()

  const onChange = async (id: number, data: LessonModelUpdate) => {
    await updateEvent({
      id,
      data,
    })
    await refetch()
  }

  const onDelete = async (id: number) => {
    await deleteEvent({ id })
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
    await createPeriod({
      data: { ...dto, weekdays: periodMap[period] },
    })
    await refetch()
  }

  const onDeletePeriod = async (periodId: number) => {
    await deletePeriodLesson({ id: periodId })
    await refetch()
  }

  const onChangePeriod = async (
    periodId: number,
    dto: LessonModelUpdate
  ) => {
    await updatePeriodLesson({ id: periodId, data: dto })
    await refetch()
  }

  return {
    onDelete,
    onChange,
    onCreate,
    onCreatePeriod,
    onChangePeriod,
    onDeletePeriod,
  }
}
