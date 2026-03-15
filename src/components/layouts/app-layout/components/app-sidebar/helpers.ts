import type { ILink } from './types'

import Cookies from 'universal-cookie'

import { SIDEBAR_COOKIE_NAME } from '@/components/ui/sidebar'
import { paths } from '@/router'
import { generatePath } from '@/utils/helpers/router'

export const getLinks = () =>
  [
    {
      label: 'Аналитика',
      to: generatePath({ path: paths.analytics }),
    },
    {
      label: 'Расписание',
      to: generatePath({ path: paths.schedule }),
    },
    {
      label: 'Сотрудники',
      to: generatePath({ path: paths.employees }),
    },
    {
      label: 'Ученики',
      to: generatePath({ path: paths.students }),
    },
    {
      label: 'Группы',
      to: generatePath({ path: paths.groups }),
    },
    {
      label: 'Финансовая отчетность',
      to: generatePath({ path: paths.report }),
    },
  ] as const satisfies ILink[]

export const getDefaultValue = () => {
  const cookies = new Cookies()
  return cookies.get<boolean | undefined>(SIDEBAR_COOKIE_NAME) ?? null
}
