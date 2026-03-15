import type { SkeletonProps } from './types'

import * as React from 'react'

import { cn } from '@/utils/helpers//shadcn'

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
