import type { EventFormProps, InputSchema } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { Calendar } from '@/components/shared/calendar'
import { Form } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Select } from '@/components/shared/select'
import { Textarea } from '@/components/shared/textarea'
import { Button } from '@/components/ui/button'
import { useTimeSelect } from '@/features/schedule/hooks'
import { createConnectForm } from '@/hocs/create-connect-form'

import { periodOptions } from '../../constants'

import { schema } from './schema'

const ConnectForm = createConnectForm<InputSchema>()

export const EventForm: React.FC<EventFormProps> = ({
  defaultValues,
  startHour,
  endHour,
  onSubmit,
}) => {
  const { getTimeOptions } = useTimeSelect()

  return (
    <Form
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
      }}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <ConnectForm>
            {({ control }) => (
              <Select
                control={control}
                name="start_time"
                inputProps={{
                  placeholder: 'Начало события',
                  options: getTimeOptions(startHour, endHour),
                }}
              />
            )}
          </ConnectForm>
          <div className="bg-grey-400 h-px w-4" />
          <ConnectForm>
            {({ control }) => (
              <Select
                control={control}
                name="end_time"
                inputProps={{
                  placeholder: 'Окончание события',
                  options: getTimeOptions(startHour, endHour),
                }}
              />
            )}
          </ConnectForm>
        </div>
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
                defaultMonth: defaultValues?.periodDateRange?.from,
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
        <ConnectForm>
          {({ control }) => (
            <Textarea
              control={control}
              name="comment"
              inputProps={{
                variant: 'underline',
                placeholder: 'Описание',
              }}
            />
          )}
        </ConnectForm>
        <ConnectForm>
          {({ formState: { isSubmitting } }) => (
            <div className="flex items-center justify-center">
              <Button isPending={isSubmitting} className="min-w-35.5">
                Сохранить
              </Button>
            </div>
          )}
        </ConnectForm>
      </div>
    </Form>
  )
}
