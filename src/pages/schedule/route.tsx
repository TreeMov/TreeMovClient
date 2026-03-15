import { type RoutePage } from '@/types/router'
import { ROUTES } from '@/utils/constants/routes-map'

export const scheduleRoute = {
  id: 'schedule',
  path: ROUTES.schedule,
  lazy: () => import('./schedule'),
} as const satisfies RoutePage
