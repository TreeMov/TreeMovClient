import React from 'react'

import { useListStudents } from '@/api/generated/core'

import { StudentCard } from '../student-card'

export const Content: React.FC = () => {
  const { data, isPending } = useListStudents()

  if (isPending) {
    return null
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {data?.map((student) => (
        <StudentCard key={student.id} {...student} />
      ))}
    </div>
  )
}
