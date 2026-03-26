import type { ScheduleConfig } from '@/features/schedule'

import { SCHEDULE_SEGMENT_SIZE } from '@/utils/constants/schedule'

export const scheduleConfig: ScheduleConfig = {
  dayFormat: 'cccc d',
  segmentSize: SCHEDULE_SEGMENT_SIZE,
}
