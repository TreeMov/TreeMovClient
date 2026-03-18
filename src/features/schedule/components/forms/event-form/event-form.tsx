import type { SubmitHandler } from 'react-hook-form'
import type { ScheduleLesson } from '../../../types'
import type { Schema } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { Form } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Button } from '@/components/ui/button'
import { createConnectForm } from '@/hocs/create-connect-form'

import { schema } from './schema'

const ConnectForm = createConnectForm<Schema>()

export const EventForm: React.FC<ScheduleLesson> = (lesson) => {
  const onSubmit: SubmitHandler<Schema> = (data) => {
    // todo сделать создание мероприятия
    // eslint-disable-next-line no-console
    console.log({ data })
  }

  return (
    <Form
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues: {
          title: lesson.type === 'read' ? lesson.title : '',
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
