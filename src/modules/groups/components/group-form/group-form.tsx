import type { GroupFormProps, Schema } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { Form } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Button } from '@/components/ui/button'
import { createConnectForm } from '@/hocs/create-connect-form'

import { schema } from './schema'

const ConnectForm = createConnectForm<Schema>()

export const GroupForm: React.FC<GroupFormProps> = ({ onSubmit }) => {
  return (
    <Form
      className="flex flex-col gap-5"
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues: { title: '' },
      }}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-2.5">
        <ConnectForm>
          {({ control }) => (
            <Input
              control={control}
              name="title"
              inputProps={{
                placeholder: 'Название',
                autoFocus: true,
              }}
            />
          )}
        </ConnectForm>
      </div>
      <ConnectForm>
        {({ formState: { isSubmitting } }) => (
          <Button isPending={isSubmitting}>Сохранить</Button>
        )}
      </ConnectForm>
    </Form>
  )
}
