import type { ScheduleContextType } from './types'

import { createContext } from 'react'

export const ScheduleContext = createContext<ScheduleContextType>(
  {} as ScheduleContextType
)
