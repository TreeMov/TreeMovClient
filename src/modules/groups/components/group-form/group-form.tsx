import type {
  SelectOptionType,
  SelectValue,
} from '@/components/ui/base-select/types'
import type { GroupFormProps, Schema } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'

import { useListStudents } from '@/api/generated/core'
import { Form } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Button } from '@/components/ui/button'
import { MultiSelect } from '@/components/ui/multi-select'
import { createConnectForm } from '@/hocs/create-connect-form'

import { schema } from './schema'

const ConnectForm = createConnectForm<Schema>()

export const GroupForm: React.FC<GroupFormProps> = ({ onSubmit }) => {
  const { data: students } = useListStudents()

  const [selectedStudents, setSelectedStudentsIds] = useState<
    SelectValue[]
  >([])

  const options: SelectOptionType[] =
    students?.map(({ id, name, surname }) => ({
      value: `${id}`,
      label: [name, surname].filter(Boolean).join(' '),
    })) ?? []

  return (
    <Form
      className="flex flex-col gap-5"
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues: { title: '' },
      }}
      onSubmit={(data) =>
        onSubmit({
          ...data,
          selectedStudentsIds: selectedStudents.map(
            ({ value }) => value
          ),
        })
      }
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
        <div className="flex flex-col gap-2">
          <MultiSelect
            value={selectedStudents}
            options={options}
            placeholder="Выберите студентов"
            valuePrefix="Выбрано студентов"
            onChange={(value) => setSelectedStudentsIds(value)}
          />
        </div>
        {selectedStudents.length > 0 && (
          <div className="flex flex-col gap-1">
            {selectedStudents.map(({ value, label }) => (
              <div key={value}>{label}</div>
            ))}
          </div>
        )}
      </div>
      <ConnectForm>
        {({ formState: { isSubmitting } }) => (
          <Button isPending={isSubmitting}>Сохранить</Button>
        )}
      </ConnectForm>
    </Form>
  )
}
