import type { ButtonProps } from './types'

import { Slot } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/utils/helpers//shadcn'

import { Icon } from '../icon'
import { Spinner } from '../spinner'

import { buttonVariants } from './constants'

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  variant,
  size,
  children,
  prependIcon,
  appendIcon,
  isPending,
  ...props
}) => {
  if (asChild) {
    return (
      <Slot.Root
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Slot.Root>
    )
  }

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isPending}
      {...props}
    >
      {isPending && <Spinner />}
      {prependIcon && !isPending && <Icon {...prependIcon} />}
      {children}
      {appendIcon && <Icon {...appendIcon} />}
    </button>
  )
}

export { Button }
