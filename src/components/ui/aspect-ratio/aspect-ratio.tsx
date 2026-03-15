'use client'

import type { AspectRatioProps } from './types'

import { AspectRatio as AspectRatioPrimitive } from 'radix-ui'
import * as React from 'react'

const AspectRatio: React.FC<AspectRatioProps> = ({ ...props }) => {
  return (
    <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
  )
}

export { AspectRatio }
