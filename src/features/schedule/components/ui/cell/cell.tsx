import React from 'react'

import { cn } from '@/utils/helpers/shadcn'

export const Cell: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-white font-medium',
        className
      )}
      {...props}
    />
  )
}
