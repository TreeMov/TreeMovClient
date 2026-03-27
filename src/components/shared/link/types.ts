import { type LinkProps } from 'react-router'

import { type PathsKeys, type TypedRouterProps } from '@/types/router'

export type ILinkProps<T extends PathsKeys> = Omit<LinkProps, 'to'> &
  TypedRouterProps<T>
