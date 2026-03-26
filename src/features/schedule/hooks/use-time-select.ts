import type { ISelectOption } from '@/components/ui/select/types'

import { SCHEDULE_SEGMENT_SIZE } from '@/utils/constants/schedule'

import { getTimeOptions } from '../helpers'

import { useSchedule } from './use-schedule'

export const useTimeSelect = () => {
  const { config } = useSchedule()

  const segmentSize =
    typeof config !== 'undefined'
      ? config.segmentSize
      : SCHEDULE_SEGMENT_SIZE

  const getOptions = (
    startHour: number,
    endHour: number
  ): ISelectOption[] =>
    getTimeOptions(startHour, endHour, segmentSize)

  return { getTimeOptions: getOptions }
}
