import { createBrowserRouter, type RouteObject } from 'react-router'

import { AppLayout } from '@/components/layouts/app-layout'
import { ProtectedLayout } from '@/components/layouts/protected-layout'
import { RootLayout } from '@/components/layouts/root-layout'
import { analyticsRoute } from '@/pages/analytics'
import { employeesRoute } from '@/pages/employees'
import { groupsRoute } from '@/pages/groups'
import { homeRoute } from '@/pages/home'
import { reportRoute } from '@/pages/report'
import { scheduleRoute } from '@/pages/schedule'
import { signInRoute } from '@/pages/sign-in'
import { signUpRoute } from '@/pages/sign-up'
import { studentsRoute } from '@/pages/students'
import { generateRouteMap } from '@/utils/helpers/router'

export const routerConfig = {
  element: <RootLayout />,
  children: [
    {
      element: <ProtectedLayout />,
      children: [
        {
          element: <AppLayout />,
          children: [
            homeRoute,
            analyticsRoute,
            scheduleRoute,
            employeesRoute,
            studentsRoute,
            groupsRoute,
            reportRoute,
          ],
        },
      ],
    },
    {
      children: [signUpRoute, signInRoute],
    },
  ],
} as const satisfies RouteObject

export const paths = generateRouteMap([routerConfig])
export const router = createBrowserRouter([routerConfig])
