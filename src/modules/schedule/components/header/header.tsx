import type { DateRange, OnSelectHandler } from 'react-day-picker'

import { format } from 'date-fns'
import React from 'react'

import { dateFormat } from '@/components/shared/schedule/constants'
import { CalendarPopover } from '@/components/ui/calendar'

import { useFilters } from '../../hooks'

export const Header: React.FC = () => {
  const { date_max, date_min, setQueryFilter } = useFilters()

  const dateRange: DateRange = {
    from: new Date(date_min),
    to: new Date(date_max),
  }

  const handleSelectDate: OnSelectHandler<DateRange> = ({
    from,
    to,
  }) => {
    setQueryFilter({
      ...(from && {
        date_min: format(from, dateFormat),
      }),
      ...(to && { date_max: format(to, dateFormat) }),
    })
  }

  return (
    <div className="flex items-center gap-2.5">
      <CalendarPopover
        required
        mode="range"
        defaultMonth={new Date(date_min)}
        selected={dateRange}
        onSelect={handleSelectDate}
      />
    </div>
  )
}
