import type { ScheduleEvent } from '../../types'

import React, { useCallback, useRef, useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  useScheduleActions,
  useScheduleStoreContext,
} from '../../hooks'
import { ScheduleDelete } from '../schedule-delete'
import { ScheduleForm } from '../schedule-form'

export const SchedulePopover: React.FC<
  React.PropsWithChildren<ScheduleEvent>
> = ({ children, ...event }) => {
  const { id, type, state } = event
  const [open, setOpen] = useState(false)
  const prevStateRef = useRef(state)

  const { store } = useScheduleStoreContext()
  const { onCreateHandler, onCreatePeriodHandler, onChangeHandler } =
    useScheduleActions()

  const onOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen)

      if (nextOpen) {
        prevStateRef.current = state
      }

      if (nextOpen) {
        store.setActiveEvent(id)
      } else {
        store.clearActiveEvent(id, prevStateRef.current)
      }
    },
    [id, state, store]
  )

  return (
    <Popover modal open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      {open && (
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
      )}
    </Popover>
  )
}
