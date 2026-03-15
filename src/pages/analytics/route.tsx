import { type RoutePage } from '@/types/router'
import { ROUTES } from '@/utils/constants/routes-map'

export const analyticsRoute = {
  id: 'analytics',
  path: ROUTES.analytics,
  lazy: () => import('./analytics'),
} as const satisfies RoutePage
