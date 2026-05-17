import { useVirtualizer } from '@tanstack/react-virtual'
import React, { useRef } from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { MIN_VIRTUAL_LENGTH } from '../../constants'
import { useBaseSelectContext } from '../../hooks'
import { useOptionListOffset } from '../../hooks/useOptionListOffset'
import { SelectOptionsList } from '../select-options-list'

export const SelectOptions: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const parentRef = useRef<HTMLDivElement | null>(null)
  const { options, hasMore, value } = useBaseSelectContext()

  const count = hasMore ? options.length + 1 : options.length
  const enabled = count >= MIN_VIRTUAL_LENGTH
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    enabled,
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  })
  const virtualItems = virtualizer.getVirtualItems()
  const virtualHeight = virtualizer.getTotalSize()

  useOptionListOffset({
    parentRef,
    options,
    value,
    virtualizer,
    isVirtual: !!enabled,
  })

  return (
    <div
      ref={parentRef}
      className={cn(
        'grid max-h-75 overflow-x-hidden overflow-y-auto outline-none',
        className
      )}
      {...props}
    >
      <SelectOptionsList
        items={virtualItems}
        virtualHeight={virtualHeight}
        isVirtual={enabled}
        measureElement={virtualizer.measureElement}
      />
    </div>
  )
}
