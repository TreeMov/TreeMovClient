import type { SubmitHandler } from 'react-hook-form'
import type { ScheduleEventRead } from '../../types'
import type { Schema as EventSchema } from '../ui/form/components/event-form/types'
import type { OutputSchema } from '../ui/form/components/lesson-form/types'

import React from 'react'

import { useFormQuery } from '../../hooks'
import { ScheduleDelete } from '../schedule-delete'
import { ScheduleForm as UScheduleForm } from '../ui/form'

import { getDefaultValues, mapFormDataFields } from './helpers'
import { type FormProps } from './types'

export const ScheduleForm: React.FC<FormProps> = ({
  onClose,
  onChangeHandler,
  onCreateHandler,
  onCreatePeriodHandler,
  ...event
}) => {
  const { id, type } = event
  const queryData = useFormQuery()

  const onSubmitEvent: SubmitHandler<EventSchema> = async ({
    title,
    period,
    periodDateRange,
  }) => {
    const nextEvent: ScheduleEventRead = {
      ...event,
      type: 'read',
      formType: 'event',
      is_canceled: false,
      is_completed: false,
      title,
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
    ...data
  }) => {
    const { id, type } = event
    const nextEvent: ScheduleEventRead = {
      ...event,
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
      defaultEventValues={{
        title:
          event.type === 'read' && event.formType === 'event'
            ? event.title
            : '',
      }}
      actions={<ScheduleDelete id={id} type={type} />}
      defaultLessonValues={getDefaultValues(event)}
      onSubmitEvent={onSubmitEvent}
      onSubmitLesson={onSubmitLesson}
      onClose={onClose}
    />
  )
}
