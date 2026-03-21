import type { ScheduleEventType } from '../../types'

import { Trash } from 'lucide-react'
import React, { useTransition } from 'react'

import { useSchedule } from '../../hooks'

export const ScheduleDelete: React.FC<{
  id: number
  type: ScheduleEventType
}> = ({ id, type }) => {
  const { onDeleteHandler } = useSchedule()
  const [isPending, startTransition] = useTransition()

  const onDelete = () =>
    startTransition(() => onDeleteHandler(id, type))

  return (
    <button
      className="flex size-6 cursor-pointer items-center justify-center"
      disabled={isPending}
      onClick={onDelete}
    >
      <Trash />
    </button>
  )
}
