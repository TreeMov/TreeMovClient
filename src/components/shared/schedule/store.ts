import type { LessonModelRead } from '@/api/generated/core'
import type {
  ScheduleLesson,
  ScheduleLessonCreate,
  ScheduleLessonState,
} from './types'

import { makeAutoObservable } from 'mobx'

import { serializeLesson } from './helpers'

type CreateLessonParams = Omit<
  ScheduleLessonCreate,
  'id' | 'color' | 'type'
>

export class Store {
  lessons: ScheduleLesson[] = []
  dragLesson: ScheduleLesson | null = null
  dragSegment: number | null = null

  constructor() {
    makeAutoObservable(this)
  }

  private _createLesson({
    date,
    end_time,
    start_time,
    state,
  }: CreateLessonParams) {
    const createdLesson: ScheduleLessonCreate = {
      id: Math.random(),
      type: 'create',
      state,
      date,
      end_time,
      start_time,
      color: '#000000',
    }
    this.lessons.push(createdLesson)
    return createdLesson
  }

  startDrag(lesson: ScheduleLesson, dragSegment: number) {
    this.updateLesson(lesson.id, { state: 'drag' })
    this.dragLesson = lesson
    this.dragSegment = dragSegment
  }

  endDrag(id: number) {
    this.updateLesson(id, { state: 'normal' })
    this.dragLesson = null
    this.dragSegment = null
  }

  setActiveLesson(id: number) {
    this.updateLesson(id, { state: 'active' })
  }

  clearActiveLesson(id: number, prevState: ScheduleLessonState) {
    this.updateLesson(id, { state: prevState })
  }

  setLessonState(id: number, state: ScheduleLessonState) {
    this.updateLesson(id, { state })
  }

  syncLessons(lessons: LessonModelRead[]) {
    const filteredLessons = this.lessons.filter(
      ({ type }) => type !== 'read'
    )
    this.lessons = [
      ...filteredLessons,
      ...lessons.map(serializeLesson),
    ]
  }

  createLesson({
    date,
    start_time,
    end_time,
    state,
  }: CreateLessonParams) {
    return this._createLesson({
      date,
      start_time,
      end_time,
      state,
    })
  }

  updateLesson(id: number, payload: Partial<ScheduleLesson>) {
    const idx = this.lessons.findIndex((lesson) => lesson.id === id)

    if (idx >= 0) {
      const updatedLesson = Object.assign(this.lessons[idx], payload)
      this.lessons.splice(idx, 1, updatedLesson)
      return updatedLesson
    }
  }

  deleteLesson(id: number) {
    const idx = this.lessons.findIndex((lesson) => lesson.id === id)

    if (idx >= 0) {
      this.lessons.splice(idx, 1)
    }
  }
}
