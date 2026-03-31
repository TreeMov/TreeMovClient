import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { Calendar } from '@/components/shared/calendar'
import { Form } from '@/components/shared/form'
import { Select } from '@/components/shared/select'
import { Textarea } from '@/components/shared/textarea'
import { Button } from '@/components/ui/button'
import {
  useFormQuery,
  useTimeSelect,
} from '@/features/schedule/hooks'
import { createConnectForm } from '@/hocs/create-connect-form'

import { periodOptions } from '../../constants'

import { schema } from './schema'
import {
  type InputSchema,
  type LessonFormProps,
  type OutputSchema,
} from './types'

const ConnectForm = createConnectForm<InputSchema>()

export const LessonForm: React.FC<LessonFormProps> = ({
  defaultValues,
  startHour,
  endHour,
  onSubmit,
}) => {
  const { getTimeOptions } = useTimeSelect()
  const queryData = useFormQuery()
  const {
    subjects: { data: subjects, isPending: isPendingSubjects },
    teachers: { data: teachers, isPending: isPendingTeachers },
    classrooms: { data: classrooms, isPending: isPendingClassroms },
    studentGroups: {
      data: studentGroups,
      isPending: isPendingGroups,
    },
  } = queryData

  return (
    <Form<InputSchema, unknown, OutputSchema>
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues,
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
            <Select
              control={control}
              name="subject"
              inputProps={{
                isLoading: isPendingSubjects,
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
            <Select
              control={control}
              name="teacher"
              inputProps={{
                isLoading: isPendingTeachers,
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
            <Select
              control={control}
              name="classroom"
              inputProps={{
                isLoading: isPendingClassroms,
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
            <Select
              control={control}
              name="student_group"
              inputProps={{
                isLoading: isPendingGroups,
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
