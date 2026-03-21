import type {
  OnChangeHandlerParams,
  OnDeleteParams,
  ScheduleContextType,
  ScheduleProps,
} from './types'

import React, { useCallback, useMemo, useRef, useState } from 'react'

import { ScheduleContext } from './context'
import { Store } from './store'

export const ScheduleProvider: React.FC<
  React.PropsWithChildren<ScheduleProps>
> = ({ children, view = 'week', onChange, onDelete, ...props }) => {
  const [store] = useState(new Store())

  const contentRef = useRef<HTMLDivElement>(null)

  const onChangeHandler = useCallback(
    async (params: OnChangeHandlerParams) => {
      const {
        dto: { id },
        prevData,
      } = params
      try {
        const nextEvents = await onChange(params)

        if (!nextEvents) {
          throw new Error()
        }

        store.deleteEvent(id)
        store.syncEvents(nextEvents)
      } catch {
        if (prevData) {
          store.updateEvent(id, prevData)
        } else {
          store.deleteEvent(id)
        }
      }
    },
    [store, onChange]
  )

  const onDeleteHandler = useCallback(
    async (params: OnDeleteParams) => {
      try {
        const nextEvents = await onDelete(params)

        const { id, type } = params
        if (nextEvents) {
          store.syncEvents(nextEvents)
        } else if (type === 'create') {
          store.deleteEvent(id)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
    [store, onDelete]
  )

  const value = useMemo<ScheduleContextType>(
    () => ({
      store,
      contentRef,
      view,
      onChangeHandler,
      onDeleteHandler,
      ...props,
    }),
    [store, view, props, onChangeHandler, onDeleteHandler]
  )

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  )
}
