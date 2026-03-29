import type { ScheduleDeleteProps } from './types'

import { Trash } from 'lucide-react'
import React, { useState, useTransition } from 'react'

import { useScheduleActions } from '../../hooks'
import { ScheduleDeletePeriodAlert } from '../alerts'
import { PeriodAlertEnum } from '../alerts/types'

export const ScheduleDelete: React.FC<ScheduleDeleteProps> = (
  event
) => {
  const { id, type } = event

  const { onDeleteHandler, onDeletePeriodHandler } =
    useScheduleActions()
  const [isPending, startTransition] = useTransition()

  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const deleteHandler = () => {
    startTransition(() => onDeleteHandler(id, type))
  }

  const onClick = () => {
    if (event.type === 'read' && event.period_lesson_id) {
      setIsAlertOpen(true)
    } else {
      deleteHandler()
    }
  }

  const onSubmit = (value: PeriodAlertEnum) => {
    switch (value) {
      case PeriodAlertEnum.ALL:
        if (event.type === 'read') {
          onDeletePeriodHandler(event.period_lesson_id!)
        }
        break
      case PeriodAlertEnum.CURRENT:
        deleteHandler()
        break
    }
  }

  return (
    <React.Fragment>
      <button
        className="flex size-6 cursor-pointer items-center justify-center"
        disabled={isPending}
        onClick={onClick}
      >
        <Trash />
      </button>
      <ScheduleDeletePeriodAlert
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onSubmit={onSubmit}
      />
    </React.Fragment>
  )
}
