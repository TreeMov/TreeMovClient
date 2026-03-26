import type { ScheduleEvent } from '../../types'

import React, { useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { useSchedule } from '../../hooks'
import { ScheduleDelete } from '../schedule-delete'
import { ScheduleForm } from '../schedule-form'

export const SchedulePopover: React.FC<
  React.PropsWithChildren<ScheduleEvent>
> = ({ children, ...event }) => {
  const { id, type } = event

  const [initialState] = useState(event.state)

  const {
    store,
    onCreateHandler,
    onCreatePeriodHandler,
    onChangeHandler,
  } = useSchedule()

  const onOpenChange = (open: boolean) => {
    if (open) {
      store.setActiveEvent(id)
    } else {
      store.clearActiveEvent(id, initialState)
    }
  }

  return (
    <Popover modal onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        sideOffset={16}
        side="right"
        align="start"
        className="w-118 shadow-2xl"
        actions={<ScheduleDelete id={id} type={type} />}
      >
        <ScheduleForm
          onCreateHandler={onCreateHandler}
          onCreatePeriodHandler={onCreatePeriodHandler}
          onChangeHandler={onChangeHandler}
          {...event}
        />
      </PopoverContent>
    </Popover>
  )
}
