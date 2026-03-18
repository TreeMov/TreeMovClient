import type { ScheduleLesson, ScheduleLessonRead } from '../../types'
import type { Schema } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { type SubmitHandler } from 'react-hook-form'

import { Combobox } from '@/components/shared/combobox'
import { Form } from '@/components/shared/form'
import { Textarea } from '@/components/shared/textarea'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { createConnectForm } from '@/hocs/create-connect-form'

import { useFormQuery, useSchedule } from '../../hooks'

import { getDefaultValues, mapFormDataFields } from './helpers'
import { schema } from './schema'

const ConnectForm = createConnectForm<Schema>()

export const SchedulePopover: React.FC<
  React.PropsWithChildren<ScheduleLesson>
> = ({ children, ...lesson }) => {
  const { id, type } = lesson
  const [initialState] = useState(lesson.state)

  const defaultOpen = type === 'create'

  const { store, onChangeHandler } = useSchedule()

  const queryData = useFormQuery()
  const {
    subjects: { data: subjects },
    teachers: { data: teachers },
    classrooms: { data: classrooms },
    studentGroups: { data: studentGroups },
  } = queryData

  const onOpenChange = (open: boolean) => {
    if (open) {
      store.setActiveLesson(id)
    } else {
      store.clearActiveLesson(id, initialState)
    }
  }

  const onSubmit: SubmitHandler<Schema> = (data) => {
    const nextLesson: ScheduleLessonRead = {
      ...lesson,
      type: 'read',
      ...mapFormDataFields({ data, queryData }),
      is_canceled: false,
      is_completed: false,
      title: '',
    }
    onChangeHandler({
      type: 'create',
      dto: nextLesson,
      prevData: lesson,
    })
    store.updateLesson(lesson.id, nextLesson)
  }

  return (
    <Popover
      modal
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side="right" align="start">
        <Form
          useFormProps={{
            resolver: zodResolver(schema),
            defaultValues: getDefaultValues(lesson),
          }}
          onSubmit={onSubmit}
        >
          <div className="flex min-w-64 flex-col gap-2">
            <ConnectForm>
              {({ control }) => (
                <Combobox
                  control={control}
                  name="subject"
                  inputProps={{
                    placeholder: 'Предмет',
                    options:
                      subjects?.map(({ title, id }) => ({
                        value: `${id}`,
                        label: title,
                      })) ?? [],
                  }}
                />
              )}
            </ConnectForm>
            <ConnectForm>
              {({ control }) => (
                <Combobox
                  control={control}
                  name="teacher"
                  inputProps={{
                    placeholder: 'Преподаватель',
                    options:
                      teachers?.map(({ employee: { name }, id }) => ({
                        value: `${id}`,
                        label: name ?? '',
                      })) ?? [],
                  }}
                />
              )}
            </ConnectForm>
            <ConnectForm>
              {({ control }) => (
                <Combobox
                  control={control}
                  name="classroom"
                  inputProps={{
                    placeholder: 'Аудитория',
                    options:
                      classrooms?.map(({ title, id }) => ({
                        value: `${id}`,
                        label: title,
                      })) ?? [],
                  }}
                />
              )}
            </ConnectForm>
            <ConnectForm>
              {({ control }) => (
                <Combobox
                  control={control}
                  name="student_group"
                  inputProps={{
                    placeholder: 'Группы',
                    options:
                      studentGroups?.map(({ title, id }) => ({
                        value: `${id}`,
                        label: title,
                      })) ?? [],
                  }}
                />
              )}
            </ConnectForm>

            <ConnectForm>
              {({ control }) => (
                <Textarea
                  control={control}
                  name="comment"
                  inputProps={{ placeholder: 'Описание' }}
                />
              )}
            </ConnectForm>

            <div className="flex items-center justify-center">
              <Button>Сохранить</Button>
            </div>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
