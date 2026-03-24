import type { CellProps } from './types'

import { Slot } from 'radix-ui'
import React from 'react'

import { cn } from '@/utils/helpers/shadcn'

export const Cell: React.FC<CellProps> = ({
  className,
  asChild,
  ...props
}) => {
  const Comp = asChild ? Slot.Root : 'div'

  return (
    <Comp
      className={cn(
        'flex w-full items-center justify-center bg-white font-medium',
        className
      )}
      {...props}
    />
  )
}
