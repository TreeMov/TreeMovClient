import type { SubmitHandler } from 'react-hook-form'
import type { ScheduleEvent, ScheduleEventRead } from '../../../types'
import type { Schema } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { Form } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Button } from '@/components/ui/button'
import { useSchedule } from '@/features/schedule/hooks'
import { createConnectForm } from '@/hocs/create-connect-form'

import { schema } from './schema'

const ConnectForm = createConnectForm<Schema>()

export const EventForm: React.FC<ScheduleEvent> = (event) => {
  const { store, onChangeHandler } = useSchedule()

  const onSubmit: SubmitHandler<Schema> = ({ title }) => {
    const { type } = event
    const nextEvent: ScheduleEventRead = {
      ...event,
      type: 'read',
      formType: 'event',
      is_canceled: false,
      is_completed: false,
      title,
    }
    switch (type) {
      case 'create':
        onChangeHandler({
          type: 'create',
          dto: nextEvent,
          prevData: event,
        })
        break
      case 'read':
        onChangeHandler({
          type: 'update',
          dto: nextEvent,
          prevData: event,
        })
        break
    }
    store.updateEvent(event.id, nextEvent)
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

        <div className="flex items-center justify-center">
          <Button className="min-w-35.5">Сохранить</Button>
        </div>
      </div>
    </Form>
  )
}
