import React from 'react'

import { PopoverContent } from '@/components/ui/popover'
import { cn } from '@/utils/helpers/shadcn'

import { useBaseSelectContext } from '../../hooks'

export const SelectContent: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { contentClassName, renderFooter } = useBaseSelectContext()

  return (
    <PopoverContent
      showCloseButton={false}
      align="start"
      side="bottom"
      avoidCollisions={false}
      collisionPadding={0}
      className={cn(
        'z-150 max-w-(--radix-popover-content-available-width) min-w-(--radix-popover-trigger-width) px-0 py-2 outline-none',
        contentClassName
      )}
    >
      <div
        className="w-full rounded-xl bg-white py-3"
        data-slot="popover-content-inner"
      >
        {children}
        {renderFooter}
      </div>
    </PopoverContent>
  )
}
