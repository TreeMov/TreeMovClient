import type { ContentProps } from './types'

import { endOfWeek, format, startOfWeek } from 'date-fns'
import React from 'react'

import { useLessons } from '@/api/generated/core'
import { dateFormat, Schedule } from '@/features/schedule'

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
    date_max: format(endOfWeek(date), dateFormat),
    date_min: format(startOfWeek(date), dateFormat),
  })

  const { onChange, onDelete, onCreate, onCreatePeriod } =
    useScheduleActions({ refetch })

  return (
    <Schedule
      view={view}
      config={scheduleConfig}
      events={events ?? []}
      isLoading={isPending}
      selectedDate={new Date(date)}
      onChange={onChange}
      onDelete={onDelete}
      onCreate={onCreate}
      onCreatePeriod={onCreatePeriod}
      onClickCell={(date) =>
        setQueryFilter({
          date: format(date, dateFormat),
          view: 'day',
        })
      }
    />
  )
}
