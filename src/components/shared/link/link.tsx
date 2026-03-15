import { stringify } from 'qs'
import { Link as RouterLink } from 'react-router'

import { type PathsKeys } from '@/types/router'
import { generatePath } from '@/utils/helpers/router'

import { type ILinkProps } from './types'

export const Link = <T extends PathsKeys>({
  to,
  query,
  ...props
}: ILinkProps<T>) => {
  const nextPath = [
    generatePath(to),
    decodeURIComponent(stringify(query)),
  ]
    .filter(Boolean)
    .join('?')
  return <RouterLink to={nextPath} {...props} />
}
