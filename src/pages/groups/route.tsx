import { type RoutePage } from '@/types/router'
import { ROUTES } from '@/utils/constants/routes-map'

export const groupsRoute = {
  id: 'groups',
  path: ROUTES.groups,
  handle: { breadcrumbs: ['Группы'] },
  lazy: () => import('./groups'),
} as const satisfies RoutePage
