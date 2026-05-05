import { type RoutePage } from '@/types/router'
import { ROUTES } from '@/utils/constants/routes-map'

export const employeesRoute = {
  id: 'employees',
  path: ROUTES.employees,
  handle: { breadcrumbs: ['Сотрудники'] },
  lazy: () => import('./employees'),
} as const satisfies RoutePage
