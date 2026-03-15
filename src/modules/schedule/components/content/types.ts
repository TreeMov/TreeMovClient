import type { useFilters } from '../../hooks'

export type ContentProps = Omit<
  ReturnType<typeof useFilters>,
  'setQueryFilter'
>
