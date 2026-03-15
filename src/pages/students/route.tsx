import { type RoutePage } from '@/types/router'
import { ROUTES } from '@/utils/constants/routes-map'

export const studentsRoute = {
  id: 'students',
  path: ROUTES.students,
  lazy: () => import('./students'),
} as const satisfies RoutePage
