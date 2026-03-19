import type { ScheduleEventType } from '../../types'

import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { useSchedule } from '../../hooks'

export const ScheduleDelete: React.FC<{
  id: number
  type: ScheduleEventType
}> = ({ id, type }) => {
  const { onDeleteHandler } = useSchedule()

  const [isLoading, setIsLoading] = useState(false)

  const onDelete = async () => {
    setIsLoading(true)
    try {
      switch (type) {
        case 'create':
          await onDeleteHandler({ type: 'create', id })
          break
        case 'read':
          await onDeleteHandler({ type: 'update', id })
          break
      }
    } catch {
      toast('Не удалось удалить мероприятие')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      className="flex size-6 cursor-pointer items-center justify-center"
      disabled={isLoading}
      onClick={onDelete}
    >
      <Trash />
    </button>
  )
}
