import type { AppLayoutContextType } from './types'

import { createContext } from 'react'

export const AppLayoutContext = createContext<AppLayoutContextType>(
  {} as AppLayoutContextType
)
