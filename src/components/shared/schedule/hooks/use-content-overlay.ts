import { addMinutes, getHours, getMinutes, set } from 'date-fns'
import { minutesInHour } from 'date-fns/constants'

import { useSchedule } from './use-schedule'

export const useContentOverlay = () => {
  const {
    store,
    contentRef,
    config: { segmentSize },
  } = useSchedule()

  const getSegmentData = (content: HTMLDivElement) => {
    const contentRect = content.getBoundingClientRect()
    const cellHeight = contentRect.height / store.hours.length

    const segmentsCount = Math.ceil(minutesInHour / segmentSize)
    const segmentHeight = cellHeight / segmentsCount

    return { segmentsCount, segmentHeight, cellHeight }
  }

  const getMouseDate = (day: Date, yPosition: number) => {
    const contentNode = contentRef.current
    if (!contentNode) {
      return
    }

    const { cellHeight, segmentHeight } = getSegmentData(contentNode)
    const contentRect = contentNode.getBoundingClientRect()
    const contentTop = contentRect.top

    const relYPosition = yPosition - contentTop
    const currCell = Math.floor(relYPosition / cellHeight)
    const cellPosition = relYPosition - currCell * cellHeight

    const currentSegment = Math.floor(cellPosition / segmentHeight)

    const hour = store.hours[currCell]

    const lessonDate = addMinutes(
      set(day, {
        hours: getHours(hour),
        minutes: getMinutes(hour),
        seconds: 0,
        milliseconds: 0,
      }),
      currentSegment * segmentSize
    )

    return lessonDate
  }

  return { getMouseDate, getSegmentData }
}
