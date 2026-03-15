import type { TypographyProps } from './types'

import { Slot } from 'radix-ui'
import React from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { typographyVariants } from './constants'

export const Typography: React.FC<
  React.PropsWithChildren<TypographyProps>
> = ({ children, className, size, variant }) => {
  return (
    <Slot.Root
      className={cn(typographyVariants({ size, variant, className }))}
    >
      {children}
    </Slot.Root>
  )
}
