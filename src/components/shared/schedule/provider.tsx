import type {
  ScheduleContextType,
  ScheduleLesson,
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

  const handleChangeReadLesson = useCallback(
    async (
      id: number,
      data: ScheduleLesson,
      prevData: ScheduleLesson
    ) => {
      try {
        const nextLessons = await onChange(data)

        if (!nextLessons) {
          throw new Error()
        }

        store.deleteLesson(id)
        store.syncLessons(nextLessons)
      } catch {
        store.updateLesson(id, prevData)
      }
    },
    [store, onChange]
  )

  const onChangeHandler = useCallback(
    async (
      id: number,
      data: ScheduleLesson,
      prevData: ScheduleLesson
    ) => {
      switch (data.type) {
        case 'resize':
        case 'drag':
        case 'create': {
          handleChangeReadLesson(id, data, prevData)
        }
      }
    },
    [handleChangeReadLesson]
  )

  const value = useMemo<ScheduleContextType>(
    () => ({ store, contentRef, onChangeHandler, ...props }),
    [props, store, onChangeHandler]
  )

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  )
}
