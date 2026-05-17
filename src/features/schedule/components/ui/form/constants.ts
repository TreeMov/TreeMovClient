import type { SelectOptionType } from '@/components/ui/base-select/types'

import { PeriodEnum, type TabOption, TabsEnum } from './types'

export const periodOptions: SelectOptionType[] = [
  { label: 'Ежедневно', value: PeriodEnum.DAILY },
  { label: 'Еженедельно', value: PeriodEnum.WEEKLY },
  { label: 'По будням', value: PeriodEnum.WEEKDAYS },
]

export const tabsOptions: TabOption[] = [
  { value: TabsEnum.LESSON, label: 'Занятия' },
  { value: TabsEnum.EVENT, label: 'Мероприятия' },
]
