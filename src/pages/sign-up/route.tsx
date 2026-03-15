import { type RoutePage } from '@/types/router'
import { ROUTES } from '@/utils/constants/routes-map'

export const signUpRoute = {
  id: 'sign-up',
  path: ROUTES.signUp,
  lazy: () => import('./sign-up'),
} as const satisfies RoutePage
