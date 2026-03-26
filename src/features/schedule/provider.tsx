import type { PeriodEnum } from './components/ui/form'
import type {
  OnChangeHandlerParams,
  PeriodRange,
  ScheduleActionsContextType,
  ScheduleCalendarContextType,
  ScheduleEventRead,
  ScheduleEventsContextType,
  ScheduleEventType,
  ScheduleProps,
  ScheduleStatusContextType,
  ScheduleStoreContextType,
  ScheduleTimeContextType,
} from './types'

import React, { useCallback, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

import {
  SCHEDULE_END_HOUR,
  SCHEDULE_START_HOUR,
} from '@/utils/constants/schedule'
import { getWeekDays } from '@/utils/helpers/dates'

import {
  ScheduleActionsContext,
  ScheduleCalendarContext,
  ScheduleEventsContext,
  ScheduleStatusContext,
  ScheduleStoreContext,
  ScheduleTimeContext,
} from './context'
import { deserializeEvent, getScheduleHours } from './helpers'
import { Store } from './store'

export const ScheduleProvider: React.FC<
  React.PropsWithChildren<ScheduleProps>
> = ({
  children,
  view = 'week',
  startHour = SCHEDULE_START_HOUR,
  endHour = SCHEDULE_END_HOUR,
  onChange,
  onDelete,
  onCreate,
  onCreatePeriod,
  ...props
}) => {
  const { selectedDate } = props

  const [store] = useState(() => new Store())

  const contentRef = useRef<HTMLDivElement>(null)

  const days = useMemo(
    () =>
      view === 'day' ? [selectedDate] : getWeekDays(selectedDate),
    [selectedDate, view]
  )
  const hours = useMemo(
    () => getScheduleHours(startHour, endHour),
    [endHour, startHour]
  )

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
      period: PeriodEnum,
      { from, to }: PeriodRange
    ) => {
      try {
        await onCreatePeriod(
          {
            ...deserializeEvent(dto),
            start_date: from,
            repeat_lessons_until_date: to,
          },
          period
        )
        store.deleteEvent(id)
      } catch {
        toast('Не удалось создать мероприятия с периодом')
      }
    },
    [store, onCreatePeriod]
  )

  const storeValue = useMemo<ScheduleStoreContextType>(
    () => ({
      store,
      contentRef,
    }),
    [store]
  )

  const calendarValue = useMemo<ScheduleCalendarContextType>(
    () => ({
      config: props.config,
      view,
      days,
      selectedDate,
      onClickCell: props.onClickCell,
    }),
    [days, props.config, props.onClickCell, selectedDate, view]
  )

  const timeValue = useMemo<ScheduleTimeContextType>(
    () => ({
      hours,
      startHour,
      endHour,
      segmentSize: props.config.segmentSize,
    }),
    [endHour, hours, props.config.segmentSize, startHour]
  )

  const statusValue = useMemo<ScheduleStatusContextType>(
    () => ({
      isLoading: props.isLoading,
    }),
    [props.isLoading]
  )

  const actionsValue = useMemo<ScheduleActionsContextType>(
    () => ({
      onChange,
      onDelete,
      onCreate,
      onCreatePeriod,
      onChangeHandler,
      onDeleteHandler,
      onCreateHandler,
      onCreatePeriodHandler,
    }),
    [
      onChange,
      onDelete,
      onCreate,
      onCreatePeriod,
      onChangeHandler,
      onDeleteHandler,
      onCreateHandler,
      onCreatePeriodHandler,
    ]
  )

  const eventsValue = useMemo<ScheduleEventsContextType>(
    () => ({
      events: props.events,
    }),
    [props.events]
  )

  return (
    <ScheduleStoreContext.Provider value={storeValue}>
      <ScheduleCalendarContext.Provider value={calendarValue}>
        <ScheduleTimeContext.Provider value={timeValue}>
          <ScheduleStatusContext.Provider value={statusValue}>
            <ScheduleActionsContext.Provider value={actionsValue}>
              <ScheduleEventsContext.Provider value={eventsValue}>
                {children}
              </ScheduleEventsContext.Provider>
            </ScheduleActionsContext.Provider>
          </ScheduleStatusContext.Provider>
        </ScheduleTimeContext.Provider>
      </ScheduleCalendarContext.Provider>
    </ScheduleStoreContext.Provider>
  )
}
