import type { ColorPickerContextValue } from './types'

import { createContext } from 'react'

export const ColorPickerContext =
  createContext<ColorPickerContextValue>(
    {} as ColorPickerContextValue
  )
