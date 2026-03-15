import type { InputProps } from './types'

import React, { useRef, useState } from 'react'

import { cn } from '@/utils/helpers//shadcn'

import { Icon } from '../icon'

import { inputVariants } from './constants'

const Input = ({
  ref,
  className,
  variant,
  size,
  prependIcon,
  appendIcon,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const { disabled } = props

  const [isFocused, setIsFocused] = useState(false)
  const rootRef = useRef<HTMLInputElement>(null)

  React.useImperativeHandle<
    HTMLInputElement | null,
    HTMLInputElement | null
  >(ref, () => rootRef.current, [])

  const handleClick = () => rootRef.current?.focus()

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  return (
    <div
      className={cn(inputVariants({ variant, size, className }))}
      data-focused={isFocused}
      data-disabled={disabled}
      onClick={handleClick}
    >
      {prependIcon && <Icon {...prependIcon} />}
      <input
        ref={rootRef}
        data-slot="input"
        className="size-full shrink outline-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {appendIcon && <Icon {...appendIcon} />}
    </div>
  )
}

export { Input }
