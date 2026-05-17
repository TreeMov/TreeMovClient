import React, { type CSSProperties } from 'react'

import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/utils/helpers/shadcn'

import { useBaseSelectContext } from '../../hooks'
import { type SelectOptionWrapperProps } from '../../types'
import { SelectOption } from '../select-option/select-option'

export const SelectOptionWrapper: React.FC<
  SelectOptionWrapperProps
> = ({ idx, loaderRef, isVirtual, vItem, measureElement }) => {
  const { options, isMultiple } = useBaseSelectContext()
  const isLoaderRow = idx > options.length - 1

  const style: CSSProperties = isVirtual
    ? {
        transform: `translateY(${vItem?.start}px)`,
      }
    : {}

  if (isLoaderRow) {
    return (
      <div ref={measureElement} key={idx}>
        <div ref={loaderRef} className="py-2" style={style}>
          <Spinner className="size-8" aria-label="Loading more..." />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={measureElement}
      key={idx}
      className={cn('w-full', {
        'absolute top-0 left-0': isVirtual,
        'hover:bg-grey-300': !isMultiple,
      })}
      style={style}
      data-slot="select-option"
      data-index={idx}
    >
      <SelectOption {...options[idx]} />
    </div>
  )
}
