import type { SubmitHandler } from 'react-hook-form'
import type {
  ScheduleLesson,
  ScheduleLessonRead,
} from '../../../types'
import type { Schema } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { Combobox } from '@/components/shared/combobox'
import { Form } from '@/components/shared/form'
import { Textarea } from '@/components/shared/textarea'
import { Button } from '@/components/ui/button'
import { createConnectForm } from '@/hocs/create-connect-form'

import { useFormQuery, useSchedule } from '../../../hooks'

import { getDefaultValues, mapFormDataFields } from './helpers'
import { schema } from './schema'

const ConnectForm = createConnectForm<Schema>()

export const LessonForm: React.FC<ScheduleLesson> = (lesson) => {
  const { store, onChangeHandler } = useSchedule()

  const queryData = useFormQuery()
  const {
    subjects: { data: subjects },
    teachers: { data: teachers },
    classrooms: { data: classrooms },
    studentGroups: { data: studentGroups },
  } = queryData

  const onSubmit: SubmitHandler<Schema> = (data) => {
    const { type } = lesson
    const nextLesson: ScheduleLessonRead = {
      ...lesson,
      type: 'read',
      ...mapFormDataFields({ data, queryData }),
      is_canceled: false,
      is_completed: false,
      title: '',
    }
    switch (type) {
      case 'create':
        onChangeHandler({
          type: 'create',
          dto: nextLesson,
          prevData: lesson,
        })
        break
      case 'read':
        onChangeHandler({
          type: 'update',
          dto: nextLesson,
          prevData: lesson,
        })
        break
    }
    store.updateLesson(lesson.id, nextLesson)
  }

  return (
    <Form
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues: getDefaultValues(lesson),
      }}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-6">
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
          <Button className="min-w-35.5">Сохранить</Button>
        </div>
      </div>
    </Form>
  )
}
