import type { Schema, StudentFormProps } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { Calendar } from '@/components/shared/calendar'
import { Form } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Button } from '@/components/ui/button'
import { createConnectForm } from '@/hocs/create-connect-form'

import { schema } from './schema'

const ConnectForm = createConnectForm<Schema>()

export const StudentForm: React.FC<StudentFormProps> = ({
  onSubmit,
}) => {
  return (
    <Form
      className="flex flex-col gap-5"
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues: { name: '', surname: '' },
      }}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex items-start gap-2.5">
          <div className="flex grow flex-col gap-2.5">
            <ConnectForm>
              {({ control }) => (
                <Input
                  control={control}
                  name="name"
                  inputProps={{
                    placeholder: 'Имя',
                    autoFocus: true,
                  }}
                />
              )}
            </ConnectForm>
            <ConnectForm>
              {({ control }) => (
                <Input
                  control={control}
                  name="surname"
                  inputProps={{
                    placeholder: 'Фамилия',
                  }}
                />
              )}
            </ConnectForm>
          </div>
          <ConnectForm>
            {({ control }) => (
              <Calendar
                control={control}
                name="birthday"
                inputProps={{
                  className: 'z-150',
                  mode: 'single',
                  placeholder: 'Дата рождения',
                }}
              />
            )}
          </ConnectForm>
        </div>
      </div>
      <ConnectForm>
        {({ formState: { isSubmitting } }) => (
          <div className="flex items-center justify-center gap-2.5">
            <Button className="min-w-48" isPending={isSubmitting}>
              Сохранить изменения
            </Button>
            <Button
              className="min-w-48"
              variant="outlined"
              disabled={isSubmitting}
            >
              Отменить
            </Button>
          </div>
        )}
      </ConnectForm>
    </Form>
  )
}
