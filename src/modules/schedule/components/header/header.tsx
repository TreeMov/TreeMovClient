import type { OnSelectHandler } from 'react-day-picker'
import type { SubmitHandler } from 'react-hook-form'
import type { ComboboxOption } from '@/components/primitives/combobox'
import type { Schema } from '@/features/schedule/components/ui/form/components/event-form/types'
import type { OutputSchema } from '@/features/schedule/components/ui/form/components/lesson-form/types'

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

import {
  type LessonModelCreate,
  useLessons,
} from '@/api/generated/core'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Select } from '@/components/ui/select'
import { dateFormat, type ScheduleView } from '@/features/schedule'
import { ScheduleForm } from '@/features/schedule/components/ui/form'

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

  const onSubmitEvent: SubmitHandler<Schema> = async ({
    start_time,
    end_time,
    title,
    period,
    periodDateRange,
  }) => {
    if (period && periodDateRange) {
      const { from, to } = periodDateRange
      await onCreatePeriod(
        {
          start_time,
          end_time,
          start_date: from,
          repeat_lessons_until_date: to,
          title,
        },
        period
      )
    } else {
      await onCreate({ date, start_time, end_time, title })
    }
  }

  const onSubmitLesson: SubmitHandler<OutputSchema> = async ({
    period,
    periodDateRange,
    start_time,
    end_time,
    subject,
    teacher,
    classroom,
    student_group,
    comment,
  }) => {
    const fields: Pick<
      LessonModelCreate,
      | 'subject_id'
      | 'teacher_id'
      | 'classroom_id'
      | 'student_group_id'
      | 'comment'
    > = {
      subject_id: +subject,
      teacher_id: +teacher,
      classroom_id: +classroom,
      student_group_id: +student_group,
      comment,
    }

    if (period && periodDateRange) {
      const { from, to } = periodDateRange
      await onCreatePeriod(
        {
          start_time,
          end_time,
          start_date: from,
          repeat_lessons_until_date: to,
          ...fields,
        },
        period
      )
    } else {
      await onCreate({
        date,
        start_time,
        end_time,
        ...fields,
      })
    }
  }

  return (
    <div className="flex items-center gap-2.5">
      <Dialog>
        <DialogTrigger>
          <Button variant="outlined" size="icon-md">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <ScheduleForm
            startHour={8}
            endHour={22}
            onClose={() => {}}
            onSubmitEvent={onSubmitEvent}
            onSubmitLesson={onSubmitLesson}
          />
        </DialogContent>
      </Dialog>
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
