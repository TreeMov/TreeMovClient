import type { ILink } from './types'

import Cookies from 'universal-cookie'

import { SIDEBAR_COOKIE_NAME } from '@/components/ui/sidebar'
import { ROUTES } from '@/utils/constants/routes-map'

export const getLinks = () =>
  [
    {
      label: 'Аналитика',
      to: ROUTES.analytics,
      icon: 'general:analytics',
    },
    {
      label: 'Расписание',
      to: ROUTES.schedule,
      icon: 'general:schedule',
    },
    {
      label: 'Сотрудники',
      to: ROUTES.employees,
      icon: 'general:schedule',
    },
    {
      label: 'Ученики',
      to: ROUTES.students,
      icon: 'general:schedule',
    },
    {
      label: 'Группы',
      to: ROUTES.groups,
      icon: 'general:catalog',
    },
    {
      label: 'Предметы',
      to: ROUTES.subjects,
      icon: 'general:catalog',
    },
    {
      label: 'Финансовая отчетность',
      to: ROUTES.report,
      icon: 'general:report',
    },
  ] as const satisfies ILink[]

export const getDefaultValue = () => {
  const cookies = new Cookies()
  return cookies.get<boolean | undefined>(SIDEBAR_COOKIE_NAME) ?? null
}
