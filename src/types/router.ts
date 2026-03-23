import type { stringify } from 'qs'

import { type RouteObject } from 'react-router'

export type { PathsKeys } from '@/router/contract'

export type RoutePage = Omit<RouteObject, 'id'> &
  Required<Pick<RouteObject, 'id'>>

type StringifyParams = Parameters<typeof stringify>
export type PathQuery =
  | StringifyParams[0]
  | { query: StringifyParams[0]; options: StringifyParams[1] }
