import type { GroupsContextType } from './types'

import { createContext } from 'react'

export const GroupsContext = createContext<GroupsContextType>(
  {} as GroupsContextType
)
