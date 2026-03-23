import type { OnSelectHandler } from 'react-day-picker'
import type { ComboboxOption } from '@/components/primitives/combobox'

import { addWeeks, format, subWeeks } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Select } from '@/components/ui/select'
import { dateFormat, type ScheduleView } from '@/features/schedule'

import { useFilters } from '../../hooks'

export const Header: React.FC = () => {
  const { date, view, setQueryFilter } = useFilters()

  const handleSelectDate: OnSelectHandler<Date> = (date) => {
    setQueryFilter({
      date: format(date, dateFormat),
    })
  }

  const onNextWeek = () => {
    setQueryFilter({
      date: format(addWeeks(date, 1), dateFormat),
    })
  }

  const onPrevWeek = () => {
    setQueryFilter({
      date: format(subWeeks(date, 1), dateFormat),
    })
  }

  const viewOptions: ComboboxOption<ScheduleView>[] = [
    { value: 'day', label: 'День' },
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' },
  ]

  return (
    <div className="flex items-center gap-2.5">
      <Button variant="outlined" size="icon-md" onClick={onPrevWeek}>
        <ChevronLeft />
      </Button>
      <Button variant="outlined" size="icon-md" onClick={onNextWeek}>
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
