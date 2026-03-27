import type { PathsKeys } from '@/router/contract'
import type { TypedRouterProps } from '@/types/router'

import { type NavigateProps as RouterNavigateProps } from 'react-router'

export type NavigateProps<T extends PathsKeys> = Omit<
  RouterNavigateProps,
  'to'
> &
  TypedRouterProps<T>
