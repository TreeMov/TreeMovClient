import type { useFormQuery } from '../../../hooks'
import type {
  ScheduleField,
  ScheduleLesson,
  ScheduleLessonFormFields,
} from '../../../types'
import type { Schema } from './types'

const mapField = (field: ScheduleField | null): string =>
  field?.id ? `${field.id}` : ''

export const getDefaultValues = (lesson: ScheduleLesson): Schema => {
  if (lesson.type === 'create') {
    return {
      subject: '',
      teacher: '',
      classroom: '',
      student_group: '',
      comment: '',
    }
  }

  const { subject, teacher, classroom, student_group, comment } =
    lesson
  return {
    subject: mapField(subject),
    teacher: mapField(teacher),
    classroom: mapField(classroom),
    student_group: mapField(student_group),
    comment: comment ?? '',
  }
}

type MapFormDataFieldsParams = {
  data: Schema
  queryData: ReturnType<typeof useFormQuery>
}

export const mapFormDataFields = ({
  data: { comment, ...data },
  queryData,
}: MapFormDataFieldsParams): ScheduleLessonFormFields => ({
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
