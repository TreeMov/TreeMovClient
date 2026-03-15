import type { SpinnerProps } from './types'

import { Loader2Icon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/utils/helpers//shadcn'

const Spinner: React.FC<SpinnerProps> = ({ className, ...props }) => {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

export { Spinner }
