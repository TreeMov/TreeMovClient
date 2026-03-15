import type { LessonModelRead } from '@/api/generated/core'

import { makeAutoObservable } from 'mobx'

import { getWeekDays } from '@/utils/helpers/dates'

import { getScheduleHours } from './helpers'

export class Store {
  lessons: LessonModelRead[] = []
  days = getWeekDays()
  hours = getScheduleHours()

  constructor() {
    makeAutoObservable(this)
  }

  syncLessons(lessons: LessonModelRead[]) {
    this.lessons = lessons
  }

  createLesson(lesson: LessonModelRead) {
    this.lessons.push(lesson)
  }

  updateLessons(lessons: LessonModelRead[]) {
    this.lessons = lessons
  }

  updateLesson(id: number, payload: Partial<LessonModelRead>) {
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
