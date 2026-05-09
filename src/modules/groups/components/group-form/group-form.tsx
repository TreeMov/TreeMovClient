import type { ISelectOption } from '@/components/ui/select/types'
import type { GroupFormProps, Schema } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'

import { useListStudents } from '@/api/generated/core'
import { Form } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Button } from '@/components/ui/button'
import { FormLabel } from '@/components/ui/form'
import { Select } from '@/components/ui/select'
import { createConnectForm } from '@/hocs/create-connect-form'
import { declination } from '@/utils/helpers/declination'

import { schema } from './schema'

const ConnectForm = createConnectForm<Schema>()

export const GroupForm: React.FC<GroupFormProps> = ({ onSubmit }) => {
  const { data: students } = useListStudents()

  const [selectedStudentsIds, setSelectedStudentsIds] = useState<
    string[]
  >([])
  const normalizedStudents: Record<string, string> = (
    students ?? []
  ).reduce(
    (acc, { id, name, surname }) => ({
      ...acc,
      [id]: [name, surname].filter(Boolean).join(' '),
    }),
    {}
  )

  const options: ISelectOption[] =
    students?.map(({ id, name, surname }) => ({
      value: `${id}`,
      label: [name, surname].filter(Boolean).join(' '),
    })) ?? []
  const placeholder = `${declination(selectedStudentsIds.length, ['Выбран', 'Выбрано', 'Выбрано'])} ${selectedStudentsIds.length} ${declination(selectedStudentsIds.length, ['человек', 'человека', 'человек'])}`

  return (
    <Form
      className="flex flex-col gap-5"
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues: { title: '' },
      }}
      onSubmit={(data) => onSubmit({ ...data, selectedStudentsIds })}
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
          <FormLabel label="Ученики" htmlFor="students" />
          <Select
            id="students"
            options={options}
            placeholder={placeholder}
            onValueChange={(value) =>
              setSelectedStudentsIds((prev) => [...prev, value])
            }
          />
        </div>
        {selectedStudentsIds.length > 0 && (
          <div className="flex flex-col gap-1">
            {selectedStudentsIds.map((id) => (
              <div key={id}>{normalizedStudents[id]}</div>
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
