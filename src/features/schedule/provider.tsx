import type {
  OnChangeHandlerParams,
  PeriodRange,
  ScheduleContextType,
  ScheduleEventRead,
  ScheduleEventType,
  ScheduleProps,
} from './types'

import React, { useCallback, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

import { ScheduleContext } from './context'
import { deserializeEvent } from './helpers'
import { Store } from './store'

export const ScheduleProvider: React.FC<
  React.PropsWithChildren<ScheduleProps>
> = ({
  children,
  view = 'week',
  onChange,
  onDelete,
  onCreate,
  onCreatePeriod,
  ...props
}) => {
  const [store] = useState(new Store())

  const contentRef = useRef<HTMLDivElement>(null)

  const onChangeHandler = useCallback(
    async (params: OnChangeHandlerParams) => {
      const { dto, prevData } = params
      const { id } = dto
      try {
        await onChange(id, deserializeEvent(dto))
      } catch {
        store.updateEvent(id, prevData)
      }
    },
    [store, onChange]
  )

  const onDeleteHandler = useCallback(
    async (id: number, type: ScheduleEventType) => {
      try {
        if (type === 'create') {
          store.deleteEvent(id)
        } else {
          await onDelete(id)
        }
      } catch {
        toast('Не удалось удалить мероприятие')
      }
    },
    [store, onDelete]
  )

  const onCreateHandler = useCallback(
    async (dto: ScheduleEventRead) => {
      try {
        await onCreate(deserializeEvent(dto))
        store.deleteEvent(dto.id)
      } catch {
        toast('Не удалось создать мероприятие')
      }
    },
    [store, onCreate]
  )

  const onCreatePeriodHandler = useCallback(
    async (
      id: number,
      dto: ScheduleEventRead,
      period: number,
      { from, to }: PeriodRange
    ) => {
      try {
        await onCreatePeriod({
          ...deserializeEvent(dto),
          start_date: from,
          repeat_lessons_until_date: to,
          period,
        })
        store.deleteEvent(id)
      } catch {
        toast('Не удалось создать мероприятия с периодом')
      }
    },
    [store, onCreatePeriod]
  )

  const value = useMemo<ScheduleContextType>(
    () => ({
      store,
      contentRef,
      view,
      onChangeHandler,
      onDeleteHandler,
      onCreateHandler,
      onCreatePeriodHandler,
      ...props,
    }),
    [
      props,
      store,
      view,
      onChangeHandler,
      onCreateHandler,
      onDeleteHandler,
      onCreatePeriodHandler,
    ]
  )

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  )
}
