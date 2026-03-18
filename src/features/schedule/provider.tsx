import type {
  OnChangeHandlerParams,
  ScheduleContextType,
  ScheduleProps,
} from './types'

import React, { useCallback, useMemo, useRef, useState } from 'react'

import { ScheduleContext } from './context'
import { Store } from './store'

export const ScheduleProvider: React.FC<
  React.PropsWithChildren<ScheduleProps>
> = ({ children, onChange, ...props }) => {
  const [store] = useState(new Store())

  const contentRef = useRef<HTMLDivElement>(null)

  const onChangeHandler = useCallback(
    async (params: OnChangeHandlerParams) => {
      const {
        dto: { id },
        prevData,
      } = params
      try {
        const nextLessons = await onChange(params)

        if (!nextLessons) {
          throw new Error()
        }

        store.deleteLesson(id)
        store.syncLessons(nextLessons)
      } catch {
        if (prevData) {
          store.updateLesson(id, prevData)
        } else {
          store.deleteLesson(id)
        }
      }
    },
    [store, onChange]
  )

  const value = useMemo<ScheduleContextType>(
    () => ({
      store,
      contentRef,
      onChangeHandler,
      ...props,
    }),
    [store, props, onChangeHandler]
  )

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  )
}
