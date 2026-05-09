import React from 'react'

import { useListSubjects } from '@/api/generated/core'
import { useGroupSelect } from '@/components/shared/group-select/hooks'
import { Checkbox } from '@/components/ui/checkbox'

import { SubjectColor } from './components'

export const Content: React.FC = () => {
  const { isSelected, onCheckChange } = useGroupSelect()
  const { data, isPending } = useListSubjects()

  if (isPending || !data) {
    return null
  }

  return (
    <div className="flex flex-col gap-2.5">
      {data.map(({ id, color, title }) => (
        <div
          key={id}
          className="flex items-start gap-3 rounded-xl bg-white p-2.5"
        >
          <div className="flex grow items-center gap-3">
            <SubjectColor id={id} color={color} />
            <div className="border-grey-200 grow rounded-xl border p-2.5 text-sm font-bold">
              {title}
            </div>
          </div>
          <Checkbox
            checked={isSelected(id)}
            onCheckedChange={() => onCheckChange(id)}
          />
        </div>
      ))}
    </div>
  )
}
