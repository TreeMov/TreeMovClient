import type { SubmitHandler } from 'react-hook-form'
import type {
  ScheduleEvent,
  ScheduleEventRead,
} from '@/features/schedule/types'
import type { FormActions } from '../../types'
import type { Schema } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { Calendar } from '@/components/shared/calendar'
import { Form } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Select } from '@/components/shared/select'
import { Button } from '@/components/ui/button'
import { createConnectForm } from '@/hocs/create-connect-form'

import { periodOptions } from '../../constants'

import { schema } from './schema'

const ConnectForm = createConnectForm<Schema>()

export const EventForm: React.FC<ScheduleEvent & FormActions> = ({
  onChangeHandler,
  onCreateHandler,
  onCreatePeriodHandler,
  ...event
}) => {
  const onSubmit: SubmitHandler<Schema> = async ({
    title,
    period,
    periodDateRange,
  }) => {
    const { id, type } = event
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

  return (
    <Form
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues: {
          title:
            event.type === 'read' && event.formType === 'event'
              ? event.title
              : '',
        },
      }}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-6">
        <ConnectForm>
          {({ control }) => (
            <Input
              control={control}
              name="title"
              inputProps={{
                placeholder: 'Название мероприятия',
                variant: 'underline',
              }}
            />
          )}
        </ConnectForm>
        <ConnectForm>
          {({ control }) => (
            <Calendar
              control={control}
              name="periodDateRange"
              inputProps={{
                mode: 'range',
                placeholder: 'Выберите дату',
              }}
            />
          )}
        </ConnectForm>
        <ConnectForm>
          {({ control }) => (
            <Select
              control={control}
              name="period"
              inputProps={{
                placeholder: 'Переодичность',
                options: periodOptions,
              }}
            />
          )}
        </ConnectForm>
        <div className="flex items-center justify-center">
          <Button className="min-w-35.5">Сохранить</Button>
        </div>
      </div>
    </Form>
  )
}
