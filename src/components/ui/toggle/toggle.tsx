'use client'

import type { ToggleProps } from './types'

import { Toggle as TogglePrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/utils/helpers//shadcn'

import { toggleVariants } from './constants'

const Toggle: React.FC<ToggleProps> = ({
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle }
