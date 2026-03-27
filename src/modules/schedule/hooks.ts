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
  useCreateLessons,
  useCreatePeriodLesson,
  useLessons,
  useLessons2,
  useUpdateLessonsId,
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
}: Pick<ReturnType<typeof useLessons>, 'refetch'>) => {
  const { mutateAsync: deleteEvent } = useLessons2()
  const { mutateAsync: updateEvent } = useUpdateLessonsId()
  const { mutateAsync: createEvent } = useCreateLessons()
  const { mutateAsync: createPeriod } = useCreatePeriodLesson()

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
    await createPeriod({
      data: { ...dto, weekdays: periodMap[period] },
    })
    await refetch()
  }

  return { onDelete, onChange, onCreate, onCreatePeriod }
}
