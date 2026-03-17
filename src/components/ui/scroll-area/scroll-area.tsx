import type { ScrollAreaProps, ScrollBarProps } from './types'

import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/utils/helpers//shadcn'

const ScrollArea: React.FC<ScrollAreaProps> = ({
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn('relative', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={cn(
          'size-full rounded-[inherit] transition-[color,box-shadow] outline-none',
          { 'overflow-hidden!': disabled }
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {!disabled && (
        <React.Fragment>
          <ScrollBar className="z-100" />
          <ScrollAreaPrimitive.Corner />
        </React.Fragment>
      )}
    </ScrollAreaPrimitive.Root>
  )
}

const ScrollBar: React.FC<ScrollBarProps> = ({
  className,
  orientation = 'vertical',
  ...props
}) => {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-colors select-none',
        {
          'h-full w-3 border-l border-l-transparent':
            orientation === 'vertical',
        },
        {
          'h-3 flex-col border-t border-t-transparent':
            orientation === 'horizontal',
        },
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 cursor-pointer rounded-full bg-violet-200 transition-colors hover:bg-violet-300"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
