import { type NavLinkProps } from 'react-router'

import { type Args } from '@/types/libs/router'
import { type PathQuery, type PathsKeys } from '@/types/router'

export type INavLinkProps<T extends PathsKeys> = Omit<
  NavLinkProps,
  'to'
> & {
  to: Args<T>
  query?: PathQuery
}
