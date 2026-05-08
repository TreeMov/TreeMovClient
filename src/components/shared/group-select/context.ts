import type { GroupSelectContextType } from './types'

import { createContext } from 'react'

export const GroupSelectContext =
  createContext<GroupSelectContextType>({} as GroupSelectContextType)
