import React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

export const ScheduleContentWrapper: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  return (
    <ScrollArea className="border-grey-200 h-full rounded-xl border select-none">
      {children}
    </ScrollArea>
  )
}
