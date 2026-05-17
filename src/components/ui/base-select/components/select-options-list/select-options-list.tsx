import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { Spinner } from '@/components/ui/spinner'

import { useBaseSelectContext } from '../../hooks'
import { type SelectOptionsListProps } from '../../types'
import { SelectOptionWrapper } from '../select-option-wrapper'

export const SelectOptionsList: React.FC<SelectOptionsListProps> = ({
  items,
  virtualHeight,
  isVirtual,
  measureElement,
}) => {
  const {
    options,
    hasOptions,
    isLoading,
    noOptionsMessage,
    onLoadMore,
  } = useBaseSelectContext()

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  })

  useEffect(() => {
    if (inView) {
      onLoadMore?.()
    }
  }, [inView, onLoadMore])

  if (isLoading) {
    return (
      <div className="py-2">
        <Spinner className="size-8" aria-label="Loading" />
      </div>
    )
  }

  if (!hasOptions) {
    return <p className="px-3 py-2 text-center">{noOptionsMessage}</p>
  }

  const menuListClassName = 'relative w-full h-full outline-none'

  if (!isVirtual) {
    return (
      <div className={menuListClassName}>
        {options.map((option, idx) => (
          <SelectOptionWrapper
            key={option.value}
            idx={idx}
            isVirtual={isVirtual}
            loaderRef={ref}
            measureElement={measureElement}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={menuListClassName}
      style={{
        height: virtualHeight,
      }}
    >
      {items.map((vItem) => (
        <SelectOptionWrapper
          key={vItem.index}
          idx={vItem.index}
          isVirtual={isVirtual}
          loaderRef={ref}
          measureElement={measureElement}
          vItem={vItem}
        />
      ))}
    </div>
  )
}
