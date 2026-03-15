import { endOfMonth, format, startOfMonth } from 'date-fns'
import { parseAsString, useQueryStates } from 'nuqs'

import { dateFormat } from '@/components/shared/schedule/constants'

export const useFilters = () => {
  const defaultDateMin = format(startOfMonth(new Date()), dateFormat)
  const defaultDateMax = format(endOfMonth(new Date()), dateFormat)

  const [queryFilters, setQueryFilter] = useQueryStates({
    date_min: parseAsString
      .withDefault(defaultDateMin)
      .withOptions({ clearOnDefault: true }),
    date_max: parseAsString
      .withDefault(defaultDateMax)
      .withOptions({ clearOnDefault: true }),
  })

  return { ...queryFilters, setQueryFilter }
}
