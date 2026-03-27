import { type RoutePage } from '@/types/router'
import { ROUTES } from '@/utils/constants/routes-map'

export const createOrgRoute = {
  id: 'create-org',
  path: ROUTES.createOrg,
  lazy: () => import('./create-org'),
} as const satisfies RoutePage
