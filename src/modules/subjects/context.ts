import type { SubjectsContextType } from './types'

import { createContext } from 'react'

export const SubjectsContext = createContext<SubjectsContextType>(
  {} as SubjectsContextType
)
