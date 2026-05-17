import { Popover } from 'radix-ui'
import { forwardRef } from 'react'

import { useBaseSelectContext } from '../../hooks'
import { type SelectTriggerProps } from '../../types'

export const SelectTrigger = forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(({ className, disabled, children }, ref) => {
  const { toggleOpen } = useBaseSelectContext()

  return (
    <Popover.Trigger
      ref={ref}
      className={className}
      disabled={disabled}
      onClick={toggleOpen}
    >
      {children}
    </Popover.Trigger>
  )
})

SelectTrigger.displayName = 'SelectTrigger'
