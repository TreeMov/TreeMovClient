import type { LessonModelRead } from '@/api/generated/core'
import type {
  ScheduleLesson,
  ScheduleLessonCreate,
  ScheduleLessonType,
} from './types'

import { makeAutoObservable } from 'mobx'

import { serializeLesson } from './helpers'

export class Store {
  lessons: ScheduleLesson[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setLessonType(id: number, type: ScheduleLessonType) {
    this.updateLesson(id, { type })
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

  createLesson(lesson: ScheduleLessonCreate) {
    this.lessons.push(lesson)
  }

  updateLesson(id: number, payload: Partial<ScheduleLesson>) {
    const idx = this.lessons.findIndex((lesson) => lesson.id === id)

    if (idx >= 0) {
      const updatedLesson = Object.assign(this.lessons[idx], payload)
      this.lessons.splice(idx, 1, updatedLesson)
    }
  }

  deleteLesson(id: number) {
    const idx = this.lessons.findIndex((lesson) => lesson.id === id)

    if (idx >= 0) {
      this.lessons.splice(idx, 1)
    }
  }
}
