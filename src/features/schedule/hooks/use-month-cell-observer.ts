import type { ScheduleEvent } from '../types'

import { isNil } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'

export const useMonthCellObserver = (events: ScheduleEvent[]) => {
  const cellObserverRef = useRef<HTMLDivElement>(null)
  const [overflowedIdx, setOverflowedIdx] = useState<number | null>(
    null
  )
  const isOverflowedCell = !isNil(overflowedIdx)

  const filteredEvents = overflowedIdx
    ? events.slice(0, overflowedIdx)
    : events

  useEffect(() => {
    if (!cellObserverRef.current) {
      return
    }

    const previews = cellObserverRef.current.querySelectorAll(
      '[data-event-preview]'
    )

    if (!previews.length) {
      return
    }

    const containerRect =
      cellObserverRef.current.getBoundingClientRect()

    for (let idx = 0; idx < previews.length; idx++) {
      const previewRect = previews[idx].getBoundingClientRect()
      const relativePreviewYPosition =
        previewRect.top - containerRect.top
      const relativePreviewYBottomPosition =
        relativePreviewYPosition + previewRect.height
      const isOverflow =
        relativePreviewYBottomPosition > containerRect.height

      if (isOverflow) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOverflowedIdx(idx)
        break
      }
    }

    return () => {
      setOverflowedIdx(null)
    }
  }, [events])

  return { cellObserverRef, filteredEvents, isOverflowedCell }
}
