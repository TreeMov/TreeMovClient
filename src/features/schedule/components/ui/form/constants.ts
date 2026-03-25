import type { ISelectOption } from '@/components/ui/select/types'

import { format } from 'date-fns'

import { timeFormat } from '@/features/schedule/constants'
import { getScheduleHours } from '@/features/schedule/helpers'

import { PeriodEnum, type TabOption, TabsEnum } from './types'

export const periodOptions: ISelectOption[] = [
  { label: 'Ежедневно', value: PeriodEnum.DAILY },
  { label: 'Еженедельно', value: PeriodEnum.WEEKLY },
  { label: 'По будням', value: PeriodEnum.WEEKDAYS },
]

export const tabsOptions: TabOption[] = [
  { value: TabsEnum.LESSON, label: 'Занятия' },
  { value: TabsEnum.EVENT, label: 'Мероприятия' },
]

export const getTimeOptions = (
  startHour: number,
  endHour: number
): ISelectOption[] =>
  getScheduleHours(startHour, endHour).map((hour) => {
    const value = format(hour, timeFormat)
    return { label: value, value }
  })
