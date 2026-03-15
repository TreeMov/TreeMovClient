import { type RoutePage } from '@/types/router'
import { ROUTES } from '@/utils/constants/routes-map'

export const homeRoute = {
  id: 'home',
  path: ROUTES.home,
  lazy: () => import('./home'),
} as const satisfies RoutePage
