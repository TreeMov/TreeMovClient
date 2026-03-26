import type { Store } from '../store'
import type {
  ScheduleActionsContextType,
  ScheduleCalendarContextType,
  ScheduleEventsContextType,
  ScheduleStatusContextType,
  ScheduleStoreContextType,
  ScheduleTimeContextType,
} from '../types'

import { reaction } from 'mobx'
import { useContext, useSyncExternalStore } from 'react'

import {
  ScheduleActionsContext,
  ScheduleCalendarContext,
  ScheduleEventsContext,
  ScheduleStatusContext,
  ScheduleStoreContext,
  ScheduleTimeContext,
} from '../context'

export const useScheduleStoreContext = () => {
  return useContext(ScheduleStoreContext)
}

export const useScheduleCalendar = () => {
  return useContext(ScheduleCalendarContext)
}

export const useScheduleTime = () => {
  return useContext(ScheduleTimeContext)
}

export const useScheduleStatus = () => {
  return useContext(ScheduleStatusContext)
}

export const useScheduleActions = () => {
  return useContext(ScheduleActionsContext)
}

export const useScheduleEvents = () => {
  return useContext(ScheduleEventsContext)
}

export const useScheduleStore = <T>(
  selector: (store: Store) => T
) => {
  const { store } = useScheduleStoreContext()

  return useSyncExternalStore(
    (onStoreChange) => reaction(() => selector(store), onStoreChange),
    () => selector(store),
    () => selector(store)
  )
}

export const useSchedule = () => {
  return {
    ...useScheduleStoreContext(),
    ...useScheduleCalendar(),
    ...useScheduleTime(),
    ...useScheduleStatus(),
    ...useScheduleActions(),
    ...useScheduleEvents(),
  } satisfies ScheduleStoreContextType &
    ScheduleCalendarContextType &
    ScheduleTimeContextType &
    ScheduleStatusContextType &
    ScheduleActionsContextType &
    ScheduleEventsContextType
}
