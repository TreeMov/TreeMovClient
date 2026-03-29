import type {
  OnChangeHandlerParams,
  ScheduleEvent,
  ScheduleEventRead,
} from '../../types'

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
import { ScheduleChangePeriodAlert } from '../alerts'
import { PeriodAlertEnum } from '../alerts/types'
import { ScheduleDelete } from '../schedule-delete'
import { ScheduleForm } from '../schedule-form'

export const SchedulePopover: React.FC<
  React.PropsWithChildren<ScheduleEvent>
> = ({ children, ...event }) => {
  const { id } = event
  const initialEvent = useRef<ScheduleEvent>(event)
  const nextEvent = useRef<ScheduleEventRead | null>(null)

  const { store } = useScheduleStoreContext()
  const {
    onCreateHandler,
    onCreatePeriodHandler,
    onChangeHandler,
    onChangePeriodHandler,
  } = useScheduleActions()

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const onAlertSubmit = (value: PeriodAlertEnum) => {
    if (!nextEvent.current) {
      return
    }

    switch (value) {
      case PeriodAlertEnum.ALL:
        onChangePeriodHandler(
          nextEvent.current.id,
          nextEvent.current.period_lesson_id!,
          initialEvent.current
        )
        break
      case PeriodAlertEnum.CURRENT:
        onChangeHandler({
          dto: nextEvent.current,
          prevData: initialEvent.current,
        })
        break
    }
  }
  const onAlertCancel = () => {
    store.updateEvent(id, initialEvent.current)
  }

  const onOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        initialEvent.current = event
      }

      if (nextOpen) {
        store.setActiveEvent(id)
      } else {
        store.clearActiveEvent(id, initialEvent.current.state)
      }
    },
    [event, id, store]
  )

  const onChangeFormHandler = useCallback(
    async (params: OnChangeHandlerParams) => {
      const { dto } = params
      if (dto.type === 'read' && dto.period_lesson_id) {
        nextEvent.current = dto
        setIsAlertOpen(true)
      } else {
        onChangeHandler(params)
      }
    },
    [onChangeHandler]
  )

  return (
    <React.Fragment>
      <Popover modal onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          sideOffset={16}
          side="right"
          align="start"
          className="w-118 shadow-2xl"
          actions={<ScheduleDelete {...event} />}
        >
          <ScheduleForm
            onCreateHandler={onCreateHandler}
            onCreatePeriodHandler={onCreatePeriodHandler}
            onChangeHandler={onChangeFormHandler}
            {...event}
          />
        </PopoverContent>
      </Popover>
      <ScheduleChangePeriodAlert
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onSubmit={onAlertSubmit}
        onCancel={onAlertCancel}
      />
    </React.Fragment>
  )
}
