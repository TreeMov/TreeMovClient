import type { ILink } from './types'

import Cookies from 'universal-cookie'

import { SIDEBAR_COOKIE_NAME } from '@/components/ui/sidebar'
import { ROUTES } from '@/utils/constants/routes-map'

export const getLinks = () =>
  [
    {
      label: 'Аналитика',
      to: ROUTES.analytics,
    },
    {
      label: 'Расписание',
      to: ROUTES.schedule,
    },
    {
      label: 'Сотрудники',
      to: ROUTES.employees,
    },
    {
      label: 'Ученики',
      to: ROUTES.students,
    },
    {
      label: 'Группы',
      to: ROUTES.groups,
    },
    {
      label: 'Финансовая отчетность',
      to: ROUTES.report,
    },
  ] as const satisfies ILink[]

export const getDefaultValue = () => {
  const cookies = new Cookies()
  return cookies.get<boolean | undefined>(SIDEBAR_COOKIE_NAME) ?? null
}
