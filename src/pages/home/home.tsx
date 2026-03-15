import { Navigate } from 'react-router'

import { paths } from '@/router'
import { generatePath } from '@/utils/helpers/router'

export const Component = () => {
  return <Navigate to={generatePath({ path: paths.analytics })} />
}
