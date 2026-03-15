import type { stringify } from 'qs'

import { type RouteObject } from 'react-router'

import { type routerConfig } from '@/router'

import { type ExtractConfig } from './libs/router'

export type RoutePage = Omit<RouteObject, 'id'> &
  Required<Pick<RouteObject, 'id'>>

type Paths = ExtractConfig<typeof routerConfig>
export type PathsKeys = Paths[keyof Paths]

type StringifyParams = Parameters<typeof stringify>
export type PathQuery =
  | StringifyParams[0]
  | { query: StringifyParams[0]; options: StringifyParams[1] }
