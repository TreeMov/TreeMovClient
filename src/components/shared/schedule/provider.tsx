import type { LessonModelRead } from '@/api/generated/core'
import type { ScheduleContextType, ScheduleProps } from './types'

import React, { useCallback, useMemo, useRef, useState } from 'react'

import { ScheduleContext } from './context'
import { Store } from './store'

export const ScheduleProvider: React.FC<
  React.PropsWithChildren<ScheduleProps>
> = ({ children, onChange, ...props }) => {
  const [store] = useState(new Store())

  const contentRef = useRef<HTMLDivElement>(null)

  const onChangeHandler = useCallback(
    async (
      id: number,
      data: LessonModelRead,
      prevData: LessonModelRead
    ) => {
      if (!onChange) {
        return
      }

      try {
        const nextLessons = await onChange(data)

        if (!nextLessons) {
          throw new Error()
        }

        if (nextLessons) {
          store.deleteLesson(id)
          store.updateLessons(nextLessons)
        }
      } catch {
        store.updateLesson(id, prevData)
      }
    },
    [store, onChange]
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
