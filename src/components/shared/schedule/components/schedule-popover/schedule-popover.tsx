import type { ScheduleLesson } from '../../types'

import React from 'react'

import {
  useAllStudentGroups,
  useClassroomClassrooms,
  useClassroomSubjects,
  useTeachers,
} from '@/api/generated/core'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { useSchedule } from '../../hooks'

export const SchedulePopover: React.FC<
  React.PropsWithChildren<ScheduleLesson>
> = ({ children, ...lesson }) => {
  const {
    id,
    type,
    subject,
    teacher,
    classroom,
    student_group,
    comment,
  } = lesson

  const { store, onChangeHandler } = useSchedule()

  const defaultOpen = type === 'create'

  const { data: subjects } = useClassroomSubjects(
    {},
    { query: { refetchOnMount: false } }
  )
  const { data: teachers } = useTeachers(
    {},
    {
      query: { refetchOnMount: false },
    }
  )
  const { data: classrooms } = useClassroomClassrooms(
    {},
    { query: { refetchOnMount: false } }
  )
  const { data: studentGroups } = useAllStudentGroups(
    {},
    { query: { refetchOnMount: false } }
  )

  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side="right" align="start">
        <div className="flex min-w-64 flex-col gap-2">
          <Select
            placeholder="Предмет"
            options={
              subjects?.map(({ title, id }) => ({
                value: id,
                label: title,
              })) ?? []
            }
            defaultValue={`${subject?.id}`}
            onValueChange={(subject) =>
              store.updateLesson(id, {
                subject: { id: +subject, label: 'lalala' },
              })
            }
          />
          <Select
            placeholder="Преподаватель"
            options={
              teachers?.map(({ employee: { name }, id }) => ({
                value: id,
                label: name ?? '',
              })) ?? []
            }
            defaultValue={`${teacher?.id}`}
            onValueChange={(teacher) =>
              store.updateLesson(id, {
                teacher: { id: +teacher, label: 'teacher 111' },
              })
            }
          />
          <Select
            placeholder="Аудитория"
            options={
              classrooms?.map(({ title, id }) => ({
                value: id,
                label: title,
              })) ?? []
            }
            defaultValue={`${classroom?.id}`}
            onValueChange={(classroom) =>
              store.updateLesson(id, {
                classroom: { id: +classroom, label: 'classroom 111' },
              })
            }
          />
          <Select
            placeholder="Группы"
            options={
              studentGroups?.map(({ title, id }) => ({
                value: id,
                label: title,
              })) ?? []
            }
            defaultValue={`${student_group?.id}`}
            onValueChange={(student_group) =>
              store.updateLesson(id, {
                student_group: {
                  id: +student_group,
                  label: 'student_group 111',
                },
              })
            }
          />
          <Textarea placeholder="Описание" defaultValue={comment} />
          <div className="flex items-center justify-center">
            <Button onClick={() => onChangeHandler(id, lesson)}>
              Сохранить
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
