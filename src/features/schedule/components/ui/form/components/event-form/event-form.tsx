import type { EventFormProps, InputSchema } from './types'

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

const ConnectForm = createConnectForm<InputSchema>()

export const EventForm: React.FC<EventFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  return (
    <Form
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
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
