import { type NavLinkProps } from 'react-router'

import { type PathsKeys, type TypedRouterProps } from '@/types/router'

export type INavLinkProps<T extends PathsKeys> = Omit<
  NavLinkProps,
  'to'
> &
  TypedRouterProps<T>
