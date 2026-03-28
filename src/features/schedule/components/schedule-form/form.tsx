import type { SubmitHandler } from 'react-hook-form'
import type { ScheduleEventRead } from '../../types'
import type { Schema as EventSchema } from '../ui/form/components/event-form/types'
import type { OutputSchema } from '../ui/form/components/lesson-form/types'

import React from 'react'

import { useFormQuery, useScheduleTime } from '../../hooks'
import { ScheduleForm as UScheduleForm } from '../ui/form'

import {
  getDefaultEventValues,
  getDefaultLessonValues,
  getDefaultTab,
  mapFormDataFields,
} from './helpers'
import { type FormProps } from './types'

export const ScheduleForm: React.FC<FormProps> = ({
  onChangeHandler,
  onCreateHandler,
  onCreatePeriodHandler,
  ...event
}) => {
  const { id, type } = event
  const { startHour, endHour } = useScheduleTime()
  const queryData = useFormQuery()

  const onSubmitEvent: SubmitHandler<EventSchema> = async ({
    start_time,
    end_time,
    title,
    period,
    periodDateRange,
    comment,
  }) => {
    const nextEvent: ScheduleEventRead = {
      ...event,
      start_time,
      end_time,
      type: 'read',
      formType: 'event',
      is_canceled: false,
      is_completed: false,
      title,
      comment,
    }
    if (period && periodDateRange) {
      await onCreatePeriodHandler(
        id,
        nextEvent,
        period,
        periodDateRange
      )
    } else {
      switch (type) {
        case 'create':
          await onCreateHandler(nextEvent)
          break
        case 'read':
          await onChangeHandler({
            dto: nextEvent,
            prevData: event,
          })
          break
      }
    }
  }

  const onSubmitLesson: SubmitHandler<OutputSchema> = async ({
    period,
    periodDateRange,
    start_time,
    end_time,
    ...data
  }) => {
    const { id, type } = event
    const nextEvent: ScheduleEventRead = {
      ...event,
      start_time,
      end_time,
      type: 'read',
      formType: 'lesson',
      is_canceled: false,
      is_completed: false,
      ...mapFormDataFields({ data, queryData }),
    }
    if (period && periodDateRange) {
      await onCreatePeriodHandler(
        id,
        nextEvent,
        period,
        periodDateRange
      )
    } else {
      switch (type) {
        case 'create':
          await onCreateHandler(nextEvent)
          break
        case 'read':
          await onChangeHandler({
            dto: nextEvent,
            prevData: event,
          })
          break
      }
    }
  }

  return (
    <UScheduleForm
      defaultTab={getDefaultTab(event)}
      defaultEventValues={getDefaultEventValues(event)}
      defaultLessonValues={getDefaultLessonValues(event)}
      startHour={startHour ?? 0}
      endHour={endHour ?? 0}
      onSubmitEvent={onSubmitEvent}
      onSubmitLesson={onSubmitLesson}
    />
  )
}
