import {
  useAllStudentGroups,
  useClassroomClassrooms,
  useClassroomSubjects,
  useTeachers,
} from '@/api/generated/core'

export const useFormQuery = () => {
  const subjects = useClassroomSubjects(
    {},
    { query: { refetchOnMount: false } }
  )
  const teachers = useTeachers(
    {},
    {
      query: { refetchOnMount: false },
    }
  )
  const classrooms = useClassroomClassrooms(
    {},
    { query: { refetchOnMount: false } }
  )
  const studentGroups = useAllStudentGroups(
    {},
    { query: { refetchOnMount: false } }
  )

  return { subjects, teachers, classrooms, studentGroups }
}
