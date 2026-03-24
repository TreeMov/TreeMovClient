import React from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

import { useSchedule } from '../../hooks'

export const ScheduleContentWrapper: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const { isLoading } = useSchedule()

  return (
    <ScrollArea
      className="border-grey-200 h-full overflow-hidden rounded-xl border"
      disabled={isLoading}
    >
      {children}
    </ScrollArea>
  )
}
