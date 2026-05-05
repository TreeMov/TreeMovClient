import React from 'react'

import { useListStudentGroups } from '@/api/generated/core'

import { GroupCard } from '../group-card'

export const Content: React.FC = () => {
  const { data, isPending } = useListStudentGroups()

  if (isPending) {
    return null
  }

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {data?.map((group) => (
        <GroupCard key={group.id} {...group} />
      ))}
    </div>
  )
}
