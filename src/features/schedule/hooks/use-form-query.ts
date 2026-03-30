import {
  useListClassrooms,
  useListStudentGroups,
  useListSubjects,
  useListTeacher,
} from '@/api/generated/core'

export const useFormQuery = () => {
  const subjects = useListSubjects(
    {},
    { query: { refetchOnMount: false } }
  )
  const teachers = useListTeacher(
    {},
    {
      query: { refetchOnMount: false },
    }
  )
  const classrooms = useListClassrooms(
    {},
    { query: { refetchOnMount: false } }
  )
  const studentGroups = useListStudentGroups(
    {},
    { query: { refetchOnMount: false } }
  )

  const isPending =
    subjects.isPending ||
    teachers.isPending ||
    classrooms.isPending ||
    studentGroups.isPending

  return { subjects, teachers, classrooms, studentGroups, isPending }
}
