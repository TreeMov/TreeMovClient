import type { LessonModelRead } from '@/api/generated/core'
import type {
  ScheduleEvent,
  ScheduleEventCreate,
  ScheduleEventState,
} from './types'

import { isBefore, isSameMinute } from 'date-fns'
import { isEqual } from 'lodash-es'
import { makeAutoObservable } from 'mobx'

import { combineDateAndTime, serializeEvent } from './helpers'

type CreateEventParams = Omit<
  ScheduleEventCreate,
  'id' | 'color' | 'type'
>

export class Store {
  _events: ScheduleEvent[] = []
  dragEvent: ScheduleEvent | null = null
  dragSegment: number | null = null

  constructor() {
    makeAutoObservable(this)
  }

  private _createEvent({
    date,
    end_time,
    start_time,
    state,
  }: CreateEventParams) {
    const createdEvent: ScheduleEventCreate = {
      id: Math.random(),
      type: 'create',
      state,
      date,
      end_time,
      start_time,
      color: '#000000',
    }
    this._events.push(createdEvent)
    return createdEvent
  }

  get events() {
    return this._events.slice().sort((a, b) => {
      const aDateTime = combineDateAndTime(a.date, a.start_time)
      const bDateTime = combineDateAndTime(b.date, b.start_time)
      if (isSameMinute(aDateTime, bDateTime)) {
        return 0
      }

      return isBefore(aDateTime, bDateTime) ? -1 : 1
    })
  }

  startDrag(event: ScheduleEvent, dragSegment: number) {
    // @ts-expect-error todo исправить
    this.dragEvent =
      this.updateEvent(event.id, { state: 'drag' }) ?? event
    this.dragSegment = dragSegment
  }

  endDrag(id: number) {
    this.updateEvent(id, { state: 'normal' })
    this.dragEvent = null
    this.dragSegment = null
  }

  setActiveEvent(id: number) {
    this.updateEvent(id, { state: 'active' })
  }

  clearActiveEvent(id: number, prevState: ScheduleEventState) {
    this.updateEvent(id, { state: prevState })
  }

  setEventState(id: number, state: ScheduleEventState) {
    this.updateEvent(id, { state })
  }

  syncEvents(events: LessonModelRead[]) {
    const draftEvents = this._events.filter(
      ({ type }) => type !== 'read'
    )
    const readEventsById = new Map(
      this._events
        .filter(
          (
            event
          ): event is Extract<ScheduleEvent, { type: 'read' }> =>
            event.type === 'read'
        )
        .map((event) => [event.id, event])
    )

    const nextReadEvents = events.map((event) => {
      const serializedEvent = serializeEvent(event)
      const prevEvent = readEventsById.get(serializedEvent.id)

      if (!prevEvent) {
        return serializedEvent
      }

      const nextEvent = {
        ...serializedEvent,
        state: prevEvent.state,
        className: prevEvent.className,
      }

      return isEqual(prevEvent, nextEvent) ? prevEvent : nextEvent
    })

    const nextEvents = [...draftEvents, ...nextReadEvents]
    const isSameEvents =
      nextEvents.length === this._events.length &&
      nextEvents.every((event, idx) => event === this._events[idx])

    if (!isSameEvents) {
      this._events = nextEvents
    }
  }

  createEvent({
    date,
    start_time,
    end_time,
    state,
  }: CreateEventParams) {
    return this._createEvent({
      date,
      start_time,
      end_time,
      state,
    })
  }

  updateEvent(id: number, payload: Partial<ScheduleEvent>) {
    const idx = this._events.findIndex((event) => event.id === id)

    if (idx >= 0) {
      const updatedEvent = {
        ...this._events[idx],
        ...payload,
      }
      // @ts-expect-error todo исправить
      this._events.splice(idx, 1, updatedEvent)

      if (this.dragEvent?.id === id) {
        // @ts-expect-error todo исправить
        this.dragEvent = updatedEvent
      }

      return updatedEvent
    }
  }

  deleteEvent(id: number) {
    const idx = this._events.findIndex((event) => event.id === id)

    if (idx >= 0) {
      this._events.splice(idx, 1)
    }
  }
}
