import { type RoutePage } from '@/types/router'
import { ROUTES } from '@/utils/constants/routes-map'

export const signInRoute = {
  id: 'sign-in',
  path: ROUTES.signIn,
  lazy: () => import('./sign-in'),
} as const satisfies RoutePage
