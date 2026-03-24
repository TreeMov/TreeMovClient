import type { useFormQuery } from '@/features/schedule/hooks'
import type {
  ScheduleEvent,
  ScheduleField,
  ScheduleLessonFormFields,
} from '@/features/schedule/types'

import { type BaseSchema, type Schema } from './types'

type GetDefaultValuesParams = Partial<
  Omit<ScheduleLessonFormFields, 'formType'>
> &
  Pick<ScheduleEvent, 'type'>

const mapField = (
  field: ScheduleField | null | undefined
): string | null => (field?.id ? `${field.id}` : null)

export const getDefaultValues = (
  event: GetDefaultValuesParams
): Schema => {
  if (event.type === 'create') {
    return {
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
    subject: mapField(subject),
    teacher: mapField(teacher),
    classroom: mapField(classroom),
    student_group: mapField(student_group),
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
