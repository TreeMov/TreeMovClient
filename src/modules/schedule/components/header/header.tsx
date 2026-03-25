import type { OnSelectHandler } from 'react-day-picker'
import type { ComboboxOption } from '@/components/primitives/combobox'

import {
  addDays,
  addMonths,
  addWeeks,
  endOfWeek,
  format,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import React from 'react'

import { useLessons } from '@/api/generated/core'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Select } from '@/components/ui/select'
import { dateFormat, type ScheduleView } from '@/features/schedule'
import { ScheduleDialog } from '@/features/schedule/components/schedule-dialog'

import { useFilters, useScheduleActions } from '../../hooks'

export const Header: React.FC = () => {
  const { date, view, setQueryFilter } = useFilters()

  const handleSelectDate: OnSelectHandler<Date> = (date) => {
    setQueryFilter({
      date: format(date, dateFormat),
    })
  }

  const { refetch } = useLessons({
    date_max: format(endOfWeek(date), dateFormat),
    date_min: format(startOfWeek(date), dateFormat),
  })
  const { onCreate, onCreatePeriod } = useScheduleActions({ refetch })

  const onNext = () => {
    switch (view) {
      case 'day':
        setQueryFilter({
          date: format(addDays(date, 1), dateFormat),
        })
        break
      case 'week':
        setQueryFilter({
          date: format(addWeeks(date, 1), dateFormat),
        })
        break
      case 'month':
        setQueryFilter({
          date: format(addMonths(date, 1), dateFormat),
        })
        break
    }
  }

  const onPrev = () => {
    switch (view) {
      case 'day':
        setQueryFilter({
          date: format(subDays(date, 1), dateFormat),
        })
        break
      case 'week':
        setQueryFilter({
          date: format(subWeeks(date, 1), dateFormat),
        })
        break
      case 'month':
        setQueryFilter({
          date: format(subMonths(date, 1), dateFormat),
        })
        break
    }
  }

  const viewOptions: ComboboxOption<ScheduleView>[] = [
    { value: 'day', label: 'День' },
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' },
  ]

  return (
    <div className="flex items-center gap-2.5">
      <ScheduleDialog
        date={date}
        onCreate={onCreate}
        onCreatePeriod={onCreatePeriod}
      >
        <Button variant="outlined" size="icon-md">
          <Plus />
        </Button>
      </ScheduleDialog>

      <Button variant="outlined" size="icon-md" onClick={onPrev}>
        <ChevronLeft />
      </Button>
      <Button variant="outlined" size="icon-md" onClick={onNext}>
        <ChevronRight />
      </Button>
      <Calendar
        required
        mode="single"
        defaultMonth={new Date(date)}
        selected={new Date(date)}
        onSelect={handleSelectDate}
      />
      <Select
        value={view}
        options={viewOptions}
        onValueChange={(value) => setQueryFilter({ view: value })}
      />
    </div>
  )
}
