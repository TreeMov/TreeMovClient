import React from 'react'

import { useListSubjects } from '@/api/generated/core'
import { Checkbox } from '@/components/ui/checkbox'

import { useSubjects } from '../../hooks'

export const Content: React.FC = () => {
  const { selectedSubjectsIds, setSelectedSubjectsIds } =
    useSubjects()
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
            <div
              className="size-11 rounded-full"
              style={{ backgroundColor: color }}
            />
            <div className="border-grey-200 grow rounded-xl border p-2.5 text-sm font-bold">
              {title}
            </div>
          </div>
          <Checkbox
            checked={selectedSubjectsIds.includes(id)}
            onCheckedChange={(value) =>
              setSelectedSubjectsIds((prev) =>
                value
                  ? [...prev, id]
                  : prev.filter((itemId) => itemId !== id)
              )
            }
          />
        </div>
      ))}
    </div>
  )
}
