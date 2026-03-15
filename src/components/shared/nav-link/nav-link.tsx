import { NavLink as RouterNavLink } from 'react-router'

import { type PathsKeys } from '@/types/router'
import { generatePath } from '@/utils/helpers/router'

import { type INavLinkProps } from './types'

export const NavLink = <T extends PathsKeys>({
  to,
  ...props
}: INavLinkProps<T>) => {
  return <RouterNavLink to={generatePath(to)} {...props} />
}
