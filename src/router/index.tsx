import { createBrowserRouter, type RouteObject } from 'react-router'

import { AppLayout } from '@/components/layouts/app-layout'
import { ProtectedLayout } from '@/components/layouts/protected-layout'
import { RootLayout } from '@/components/layouts/root-layout'
import { analyticsRoute } from '@/pages/analytics'
import { createOrgRoute } from '@/pages/create-org'
import { employeesRoute } from '@/pages/employees'
import { groupsRoute } from '@/pages/groups'
import { homeRoute } from '@/pages/home'
import { reportRoute } from '@/pages/report'
import { scheduleRoute } from '@/pages/schedule'
import { signInRoute } from '@/pages/sign-in'
import { signUpRoute } from '@/pages/sign-up'
import { studentsRoute } from '@/pages/students'
import { subjectsRoute } from '@/pages/subjects'

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
            subjectsRoute,
            reportRoute,
          ],
        },
      ],
    },
    {
      children: [signUpRoute, signInRoute, createOrgRoute],
    },
  ],
} as const satisfies RouteObject

export const router = createBrowserRouter([routerConfig])
