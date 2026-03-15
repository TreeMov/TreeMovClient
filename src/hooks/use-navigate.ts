import type { PathQuery } from '@/types/router'

import {
  type NavigateOptions,
  useNavigate as useRouterNavigate,
} from 'react-router'

import { type Args } from '@/types/libs/router'
import { generatePath } from '@/utils/helpers/router'

export type Pathname<T extends string> = {
  to: Args<T>
  search?: string
  query?: PathQuery
}

type NavigateFunctionType<T extends string> = (
  pathname: Pathname<T>,
  options?: NavigateOptions
) => void

export const useNavigate = <T extends string>() => {
  const routerNavigate = useRouterNavigate()

  const navigate: NavigateFunctionType<T> = (pathname, options) => {
    const { to, search } = pathname
    routerNavigate({ pathname: generatePath(to), search }, options)
  }

  return navigate
}
