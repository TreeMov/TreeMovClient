import type { ContentProps } from './types'

import { format } from 'date-fns'
import React, { useCallback, useMemo } from 'react'

import { useLessons } from '@/api/generated/core'
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
  } = useLessons({
    date_max: getDateMax(date, view),
    date_min: getDateMin(date, view),
  })

  const { onChange, onDelete, onCreate, onCreatePeriod } =
    useScheduleActions({ refetch })
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
    />
  )
}
