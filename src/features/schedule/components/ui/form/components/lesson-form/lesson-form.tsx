import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { Calendar } from '@/components/shared/calendar'
import { Form } from '@/components/shared/form'
import { SingleSelect } from '@/components/shared/single-select'
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
    isPending,
    subjects: { data: subjects },
    teachers: { data: teachers },
    classrooms: { data: classrooms },
    studentGroups: { data: studentGroups },
  } = queryData

  return (
    <Form<InputSchema, unknown, OutputSchema>
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues,
        disabled: isPending,
      }}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <ConnectForm>
            {({ control }) => (
              <SingleSelect
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
              <SingleSelect
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
            <SingleSelect
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
            <SingleSelect
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
            <SingleSelect
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
            <SingleSelect
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
            <SingleSelect
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
