import { once } from 'lodash-es'
import { createContext } from 'react'

import { type SelectContextType } from './types'

export const createBaseSelectContext = once(<T>() =>
  createContext<SelectContextType<T>>({} as SelectContextType<T>)
)
