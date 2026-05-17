import type { SelectOptionType } from '@/components/ui/base-select/types'

import { SCHEDULE_SEGMENT_SIZE } from '@/utils/constants/schedule'

import { getTimeOptions } from '../helpers'

import { useScheduleTime } from './use-schedule'

export const useTimeSelect = () => {
  const { segmentSize } = useScheduleTime()

  const resolvedSegmentSize = segmentSize ?? SCHEDULE_SEGMENT_SIZE

  const getOptions = (
    startHour: number,
    endHour: number
  ): SelectOptionType[] =>
    getTimeOptions(startHour, endHour, resolvedSegmentSize)

  return { getTimeOptions: getOptions }
}
