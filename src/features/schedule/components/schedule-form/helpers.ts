import type { useFormQuery } from '@/features/schedule/hooks'
import type {
  ScheduleEvent,
  ScheduleEventFormFields,
  ScheduleField,
  ScheduleLessonFormFields,
} from '@/features/schedule/types'
import type { InputSchema as EventInputSchema } from '../ui/form/components/event-form/types'
import type {
  BaseSchema,
  InputSchema as LessonInputSchema,
} from '../ui/form/components/lesson-form/types'

import { TabsEnum } from '../ui/form'

type DefaultEventValuesBase = Pick<
  ScheduleEvent,
  'type' | 'start_time' | 'end_time'
>

type GetDefaultLessonValuesParams = Partial<
  Omit<ScheduleLessonFormFields, 'formType'>
> &
  DefaultEventValuesBase

type GetDefaultEventValuesParams = Partial<
  Omit<ScheduleEventFormFields, 'formType'>
> &
  DefaultEventValuesBase

const mapField = (
  field: ScheduleField | null | undefined
): string | null => (field?.id ? `${field.id}` : null)

export const getDefaultTab = (event: ScheduleEvent) => {
  if (event.type === 'create') {
    return undefined
  }

  switch (event.formType) {
    case 'event':
      return TabsEnum.EVENT
    case 'lesson':
      return TabsEnum.LESSON
  }
}

export const getDefaultLessonValues = ({
  start_time,
  end_time,
  ...event
}: GetDefaultLessonValuesParams): LessonInputSchema => {
  if (event.type === 'create') {
    return {
      start_time,
      end_time,
      subject: null,
      teacher: null,
      classroom: null,
      student_group: null,
      comment: '',
    }
  }

  const { subject, teacher, classroom, student_group, comment } =
    event
  return {
    start_time,
    end_time,
    subject: mapField(subject),
    teacher: mapField(teacher),
    classroom: mapField(classroom),
    student_group: mapField(student_group),
    comment: comment ?? '',
  }
}

export const getDefaultEventValues = ({
  start_time,
  end_time,
  ...event
}: GetDefaultEventValuesParams): EventInputSchema => {
  if (event.type === 'create') {
    return {
      start_time,
      end_time,
      comment: '',
      title: '',
    }
  }

  const { title, comment } = event
  return {
    start_time,
    end_time,
    title: title ?? '',
    comment: comment ?? '',
  }
}

type MapFormDataFieldsParams = {
  data: BaseSchema
  queryData: ReturnType<typeof useFormQuery>
}

export const mapFormDataFields = ({
  data: { comment, ...data },
  queryData,
}: MapFormDataFieldsParams): Omit<
  ScheduleLessonFormFields,
  'formType'
> => ({
  subject: {
    id: +data.subject,
    label:
      queryData.subjects.data?.find(
        ({ id }) => `${id}` === data.subject
      )?.title ?? '',
  },
  teacher: {
    id: +data.teacher,
    label:
      queryData.teachers.data?.find(
        ({ id }) => `${id}` === data.teacher
      )?.employee.name ?? '',
  },
  classroom: {
    id: +data.classroom,
    label:
      queryData.classrooms.data?.find(
        ({ id }) => `${id}` === data.classroom
      )?.title ?? '',
  },
  student_group: {
    id: +data.student_group,
    label:
      queryData.studentGroups.data?.find(
        ({ id }) => `${id}` === data.student_group
      )?.title ?? '',
  },
  comment,
})
