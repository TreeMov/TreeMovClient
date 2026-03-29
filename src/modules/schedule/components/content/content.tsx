import type { ContentProps } from './types'

import { format } from 'date-fns'
import React, { useCallback, useMemo } from 'react'

import { useListLessons } from '@/api/generated/core'
import {
  dateFormat,
  getDateMax,
  getDateMin,
  Schedule,
} from '@/features/schedule'

import { scheduleConfig } from '../../constants'
import { useScheduleActions } from '../../hooks'

export const Content: React.FC<ContentProps> = ({
  date,
  view,
  setQueryFilter,
}) => {
  const {
    data: events,
    isPending,
    refetch,
  } = useListLessons({
    date_max: getDateMax(date, view),
    date_min: getDateMin(date, view),
  })

  const {
    onChange,
    onDelete,
    onCreate,
    onCreatePeriod,
    onChangePeriod,
    onDeletePeriod,
  } = useScheduleActions({ refetch })
  const selectedDate = useMemo(() => new Date(date), [date])
  const handleClickCell = useCallback(
    (nextDate: Date) =>
      setQueryFilter({
        date: format(nextDate, dateFormat),
        view: 'day',
      }),
    [setQueryFilter]
  )

  return (
    <Schedule
      view={view}
      config={scheduleConfig}
      events={events ?? []}
      isLoading={isPending}
      selectedDate={selectedDate}
      onChange={onChange}
      onDelete={onDelete}
      onCreate={onCreate}
      onCreatePeriod={onCreatePeriod}
      onClickCell={handleClickCell}
      onChangePeriod={onChangePeriod}
      onDeletePeriod={onDeletePeriod}
    />
  )
}
