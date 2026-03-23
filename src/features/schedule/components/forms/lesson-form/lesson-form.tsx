import type { SubmitHandler } from 'react-hook-form'
import type { ISelectOption } from '@/components/ui/select/types'
import type { ScheduleEvent, ScheduleEventRead } from '../../../types'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { Calendar } from '@/components/shared/calendar'
import { Form } from '@/components/shared/form'
import { Select } from '@/components/shared/select'
import { Textarea } from '@/components/shared/textarea'
import { Button } from '@/components/ui/button'
import { createConnectForm } from '@/hocs/create-connect-form'

import { useFormQuery, useSchedule } from '../../../hooks'

import { getDefaultValues, mapFormDataFields } from './helpers'
import { schema } from './schema'
import { PeriodEnum, type Schema, type SubmitSchema } from './types'

const ConnectForm = createConnectForm<Schema>()

export const LessonForm: React.FC<ScheduleEvent> = (event) => {
  const { onChangeHandler, onCreateHandler, onCreatePeriodHandler } =
    useSchedule()

  const queryData = useFormQuery()
  const {
    subjects: { data: subjects },
    teachers: { data: teachers },
    classrooms: { data: classrooms },
    studentGroups: { data: studentGroups },
  } = queryData

  const onSubmit: SubmitHandler<SubmitSchema> = async ({
    period,
    periodDateRange,
    ...data
  }) => {
    const { id, type } = event
    const nextEvent: ScheduleEventRead = {
      ...event,
      type: 'read',
      formType: 'lesson',
      is_canceled: false,
      is_completed: false,
      ...mapFormDataFields({ data, queryData }),
    }
    if (period && periodDateRange) {
      await onCreatePeriodHandler(
        id,
        nextEvent,
        period,
        periodDateRange
      )
    } else {
      switch (type) {
        case 'create':
          await onCreateHandler(nextEvent)
          break
        case 'read':
          await onChangeHandler({
            dto: nextEvent,
            prevData: event,
          })
          break
      }
    }
  }

  const periodOptions: ISelectOption[] = [
    { label: 'Ежедневно', value: PeriodEnum.DAILY },
    { label: 'Еженедельно', value: PeriodEnum.WEEKLY },
    { label: 'По будням', value: PeriodEnum.WEEKDAYS },
  ]

  return (
    <Form<Schema, unknown, SubmitSchema>
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues: getDefaultValues(event),
      }}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-6">
        <ConnectForm>
          {({ control }) => (
            <Calendar
              control={control}
              name="periodDateRange"
              inputProps={{
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
