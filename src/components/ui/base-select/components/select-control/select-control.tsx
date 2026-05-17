import clsx from 'clsx'
import { ChevronDown, Cross } from 'lucide-react'
import { Slot } from 'radix-ui'
import React, { useRef } from 'react'

import { Icon } from '@/components/ui/icon'

import { useBaseSelectContext } from '../../hooks'
import { SelectTrigger } from '../select-trigger'

export const SelectControl: React.FC = () => {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const slotRef = useRef<HTMLElement>(null)
  const {
    isOpen,
    isClearable,
    hasValue,
    renderValue,
    startIcon,
    value,
    indicatorIcon,
    renderControl,
    toggleOpen,
    onReset,
    onChange,
  } = useBaseSelectContext<string | null>()

  const isClearVisible = isClearable && hasValue

  const handleReset = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation()
    onChange(onReset())
  }

  // todo дописать классы
  const controlClassNames = clsx(
    'cursor-pointer flex items-center justify-between transition-all overflow-hidden max-w-full w-full gap-2 px-4 select-none whitespace-nowrap rounded-xl min-h-9 bg-white border-grey-200 border'
  )

  if (renderControl) {
    return (
      <Slot.Root ref={slotRef}>
        {renderControl({
          isOpen,
          value,
          classNames: controlClassNames,
          TriggerWrapper: SelectTrigger,
          toggleOpen,
        })}
      </Slot.Root>
    )
  }

  const indicatorIconClassName =
    'flex items-center justify-center w-4 h-4 transition-all text-grey-200'

  return (
    <SelectTrigger ref={triggerRef} className={controlClassNames}>
      <>
        <div>
          {startIcon}
          {renderValue}
        </div>

        <div className="flex items-center gap-4">
          {isClearVisible && (
            <div
              role="button"
              className={indicatorIconClassName}
              onClick={handleReset}
            >
              <Cross className="size-3" />
            </div>
          )}
          {!isClearVisible && (
            <div
              className={clsx(indicatorIconClassName, {
                'rotate-180': !indicatorIcon && isOpen,
              })}
            >
              {indicatorIcon ? (
                <Icon {...indicatorIcon} />
              ) : (
                <ChevronDown className="size-5" />
              )}
            </div>
          )}
        </div>
      </>
    </SelectTrigger>
  )
}
