import { type RoutePage } from '@/types/router'
import { ROUTES } from '@/utils/constants/routes-map'

export const reportRoute = {
  id: 'report',
  path: ROUTES.report,
  lazy: () => import('./report'),
} as const satisfies RoutePage
