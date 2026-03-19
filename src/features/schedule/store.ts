import type { LessonModelRead } from '@/api/generated/core'
import type {
  ScheduleEvent,
  ScheduleEventCreate,
  ScheduleEventState,
} from './types'

import { makeAutoObservable } from 'mobx'

import { serializeEvent } from './helpers'

type CreateEventParams = Omit<
  ScheduleEventCreate,
  'id' | 'color' | 'type'
>

export class Store {
  events: ScheduleEvent[] = []
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
    this.events.push(createdEvent)
    return createdEvent
  }

  startDrag(event: ScheduleEvent, dragSegment: number) {
    this.updateEvent(event.id, { state: 'drag' })
    this.dragEvent = event
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
    const filteredEvents = this.events.filter(
      ({ type }) => type !== 'read'
    )
    this.events = [...filteredEvents, ...events.map(serializeEvent)]
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
    const idx = this.events.findIndex((event) => event.id === id)

    if (idx >= 0) {
      const updatedEvent = Object.assign(this.events[idx], payload)
      this.events.splice(idx, 1, updatedEvent)
      return updatedEvent
    }
  }

  deleteEvent(id: number) {
    const idx = this.events.findIndex((event) => event.id === id)

    if (idx >= 0) {
      this.events.splice(idx, 1)
    }
  }
}
