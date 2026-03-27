import type { ScheduleConfig } from '@/features/schedule'

import { PeriodEnum } from '@/features/schedule/components/ui/form'
import { SCHEDULE_SEGMENT_SIZE } from '@/utils/constants/schedule'

export const periodMap: Record<PeriodEnum, number[]> = {
  [PeriodEnum.DAILY]: [1, 2, 3, 4, 5, 6, 7],
  [PeriodEnum.WEEKLY]: [1],
  [PeriodEnum.WEEKDAYS]: [1, 2, 3, 4, 5],
}

export const scheduleConfig: ScheduleConfig = {
  dayFormat: 'cccc d',
  segmentSize: SCHEDULE_SEGMENT_SIZE,
}
