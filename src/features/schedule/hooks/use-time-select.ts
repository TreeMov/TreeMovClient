import type { ISelectOption } from '@/components/ui/select/types'

import { SCHEDULE_SEGMENT_SIZE } from '@/utils/constants/schedule'

import { getTimeOptions } from '../helpers'

import { useScheduleTime } from './use-schedule'

export const useTimeSelect = () => {
  const { segmentSize } = useScheduleTime()

  const resolvedSegmentSize = segmentSize ?? SCHEDULE_SEGMENT_SIZE

  const getOptions = (
    startHour: number,
    endHour: number
  ): ISelectOption[] =>
    getTimeOptions(startHour, endHour, resolvedSegmentSize)

  return { getTimeOptions: getOptions }
}
