import type { PathsKeys } from '@/router/contract'
import type { NavigateProps } from './types'

import { Navigate as RouterNavigate } from 'react-router'

import { generatePath } from '@/utils/helpers/router'

export const Navigate = <T extends PathsKeys>({
  to,
  ...props
}: NavigateProps<T>) => {
  return <RouterNavigate to={generatePath(to)} {...props} />
}
