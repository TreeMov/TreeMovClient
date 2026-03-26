import type { ScheduleEvent } from '../../types'

import { combineDateAndTime } from '../../helpers'

export const getEventGroups = (events: ScheduleEvent[]) => {
  const groups = new Map<number, number>()
  const sortedEvents = events
    .map((event) => ({
      event,
      start: combineDateAndTime(
        event.date,
        event.start_time
      ).getTime(),
      end: combineDateAndTime(event.date, event.end_time).getTime(),
    }))
    .sort((a, b) => {
      if (a.start !== b.start) {
        return a.start - b.start
      }

      if (a.end !== b.end) {
        return b.end - a.end
      }

      return a.event.id - b.event.id
    })

  let currentGroup = -1
  let currentGroupEnd = -1

  for (const { event, start, end } of sortedEvents) {
    if (start >= currentGroupEnd) {
      currentGroup = 0
      currentGroupEnd = end
    } else {
      currentGroup += 1
      currentGroupEnd = Math.max(currentGroupEnd, end)
    }

    groups.set(event.id, currentGroup)
  }

  return groups
}
