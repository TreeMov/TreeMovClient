import type { ChartContextProps } from './types'

import * as React from 'react'

const ChartContext = React.createContext<ChartContextProps | null>(
  null
)

export { ChartContext }
