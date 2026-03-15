import type { BadgeProps } from './types'

import { Slot } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/utils/helpers//shadcn'

import { badgeVariants } from './constants'

const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot.Root : 'span'
  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge }
