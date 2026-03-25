import {
  eachDayOfInterval,
  format,
  isWeekend,
  parseISO,
} from 'date-fns'
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
  useCreatePeriodLessonLessons,
  useLessons,
  useLessons2,
  useUpdateStudentsLessonsId,
} from '@/api/generated/core'
import { dateFormat, type ScheduleView } from '@/features/schedule'
import { PeriodEnum } from '@/features/schedule/components/ui/form'

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
  const { mutateAsync: updateEvent } = useUpdateStudentsLessonsId()
  const { mutateAsync: createEvent } = useCreateLessons()
  const { mutateAsync: createPeriod } = useCreatePeriodLessonLessons()

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

  return { onDelete, onChange, onCreate, onCreatePeriod }
}
