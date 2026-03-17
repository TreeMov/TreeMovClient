import type { LessonModelRead } from '@/api/generated/core'
import type { ScheduleLesson, ScheduleLessonType } from './types'

import { makeAutoObservable } from 'mobx'

import { serializeLesson } from './helpers'

type CreateLessonParams = Pick<
  ScheduleLesson,
  'type' | 'date' | 'start_time' | 'end_time'
>

export class Store {
  lessons: ScheduleLesson[] = []
  activeLessonId: number | null = null
  dragLesson: ScheduleLesson | null = null
  dragSegment: number | null = null

  constructor() {
    makeAutoObservable(this)
  }

  private _createLesson(lesson: CreateLessonParams) {
    const createdLesson: ScheduleLesson = {
      ...lesson,
      id: Math.random(),
      title: '',
      teacher: undefined,
      classroom: undefined,
      student_group: undefined,
      subject: undefined,
      comment: undefined,
      is_canceled: false,
      is_completed: false,
      color: '#000000',
    }
    this.lessons.push(createdLesson)
    return createdLesson
  }

  startDrag(lesson: ScheduleLesson, dragSegment: number) {
    this.dragLesson = lesson
    this.dragSegment = dragSegment
  }

  endDrag() {
    this.dragLesson = null
    this.dragSegment = null
  }

  setActiveLesson(id: number) {
    this.activeLessonId = id
  }

  clearActiveLesson() {
    this.activeLessonId = null
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

  createLesson({
    date,
    start_time,
    end_time,
  }: Omit<CreateLessonParams, 'type'>) {
    return this._createLesson({
      date,
      start_time,
      end_time,
      type: 'create',
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
