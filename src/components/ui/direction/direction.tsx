'use client'

import type { DirectionProviderProps } from './types'

import { Direction } from 'radix-ui'
import * as React from 'react'

const DirectionProvider: React.FC<DirectionProviderProps> = ({
  dir,
  direction,
  children,
}) => {
  return (
    <Direction.DirectionProvider dir={direction ?? dir}>
      {children}
    </Direction.DirectionProvider>
  )
}

export { DirectionProvider }
