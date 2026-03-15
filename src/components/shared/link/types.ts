import { type LinkProps } from 'react-router'

import { type Args } from '@/types/libs/router'
import { type PathQuery, type PathsKeys } from '@/types/router'

export type ILinkProps<T extends PathsKeys> = Omit<
  LinkProps,
  'to'
> & {
  to: Args<T>
  query?: PathQuery
}
