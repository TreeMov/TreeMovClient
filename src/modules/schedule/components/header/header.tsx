import type { OnSelectHandler } from 'react-day-picker'

import { format } from 'date-fns'
import React from 'react'

import { CalendarPopover } from '@/components/ui/calendar'
import { dateFormat } from '@/features/schedule'

import { useFilters } from '../../hooks'

export const Header: React.FC = () => {
  const { date, setQueryFilter } = useFilters()

  const handleSelectDate: OnSelectHandler<Date> = (date) => {
    setQueryFilter({
      date: format(date, dateFormat),
    })
  }

  return (
    <div className="flex items-center gap-2.5">
      <CalendarPopover
        required
        mode="single"
        defaultMonth={new Date(date)}
        selected={new Date(date)}
        onSelect={handleSelectDate}
      />
    </div>
  )
}
