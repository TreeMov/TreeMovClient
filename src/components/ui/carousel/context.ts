import type { CarouselContextProps } from './types'

import * as React from 'react'

const CarouselContext =
  React.createContext<CarouselContextProps | null>(null)

export { CarouselContext }
