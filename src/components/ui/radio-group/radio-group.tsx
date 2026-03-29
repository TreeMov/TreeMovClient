import type { RadioGroupItemProps, RadioGroupProps } from './types'

import { CircleIcon } from 'lucide-react'
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/utils/helpers//shadcn'

const RadioGroup: React.FC<RadioGroupProps> = ({
  className,
  ...props
}) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-1', className)}
      {...props}
    />
  )
}

const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  className,
  ...props
}) => {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aspect-square size-4 shrink-0 rounded-full border border-violet-400 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-1 focus-visible:ring-violet-400 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-violet-400 text-violet-400" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
