import type {
  ScheduleActionsContextType,
  ScheduleCalendarContextType,
  ScheduleEventsContextType,
  ScheduleStatusContextType,
  ScheduleStoreContextType,
  ScheduleTimeContextType,
} from './types'

import { createContext } from 'react'

export const ScheduleStoreContext =
  createContext<ScheduleStoreContextType>(
    {} as ScheduleStoreContextType
  )

export const ScheduleCalendarContext =
  createContext<ScheduleCalendarContextType>(
    {} as ScheduleCalendarContextType
  )

export const ScheduleTimeContext =
  createContext<ScheduleTimeContextType>(
    {} as ScheduleTimeContextType
  )

export const ScheduleStatusContext =
  createContext<ScheduleStatusContextType>(
    {} as ScheduleStatusContextType
  )

export const ScheduleActionsContext =
  createContext<ScheduleActionsContextType>(
    {} as ScheduleActionsContextType
  )

export const ScheduleEventsContext =
  createContext<ScheduleEventsContextType>(
    {} as ScheduleEventsContextType
  )
