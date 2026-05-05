import { type RoutePage } from '@/types/router'
import { ROUTES } from '@/utils/constants/routes-map'

export const subjectsRoute = {
  id: 'subjects',
  path: ROUTES.subjects,
  handle: { breadcrumbs: ['Предметы'] },
  lazy: () => import('./subjects'),
} as const satisfies RoutePage
