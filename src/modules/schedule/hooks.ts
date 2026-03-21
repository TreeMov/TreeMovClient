import { format } from 'date-fns'
import {
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'

import { dateFormat, type ScheduleView } from '@/features/schedule'

export const useFilters = () => {
  const [queryFilters, setQueryFilter] = useQueryStates({
    date: parseAsString
      .withDefault(format(new Date(), dateFormat))
      .withOptions({ clearOnDefault: true }),
    view: parseAsStringEnum<ScheduleView>(['day', 'week', 'month'])
      .withDefault('week')
      .withOptions({ clearOnDefault: true }),
  })

  return { ...queryFilters, setQueryFilter }
}
