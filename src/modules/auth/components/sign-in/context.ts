import type { FormValuesContextType } from './types'

import { createContext } from 'react'

export const FormValuesContext = createContext<FormValuesContextType>(
  {} as FormValuesContextType
)
