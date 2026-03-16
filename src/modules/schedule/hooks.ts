import { format } from 'date-fns'
import { parseAsString, useQueryStates } from 'nuqs'

import { dateFormat } from '@/components/shared/schedule/constants'

export const useFilters = () => {
  const [queryFilters, setQueryFilter] = useQueryStates({
    date: parseAsString
      .withDefault(format(new Date(), dateFormat))
      .withOptions({ clearOnDefault: true }),
  })

  return { ...queryFilters, setQueryFilter }
}
