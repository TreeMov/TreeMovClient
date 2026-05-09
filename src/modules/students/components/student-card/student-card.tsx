import type { StudentModelRead } from '@/api/generated/core'

import { parse } from 'date-fns'
import React from 'react'

import { useGroupSelect } from '@/components/shared/group-select/hooks'
import { Icon } from '@/components/ui/icon'
import { cn } from '@/utils/helpers/shadcn'

export const StudentCard: React.FC<StudentModelRead> = ({
  id,
  name,
  surname,
  birthday,
}) => {
  const { onCheckChange, isSelected } = useGroupSelect()
  const isSelect = isSelected(id)

  const studentName = [name, surname].filter(Boolean).join(' ')

  const years = birthday
    ? new Date().getFullYear() -
      parse(birthday, 'yyyy-MM-dd', new Date()).getFullYear()
    : null

  return (
    <div
      className={cn(
        'rounded-xl border border-white bg-white px-5 py-4',
        {
          'border-orange-57': isSelect,
        }
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="text-sm font-bold">{studentName}</div>
          {!!years && <div>{years} год</div>}
          {birthday && <div>{birthday}</div>}
        </div>
        <button
          className="cursor-pointer"
          onClick={() => onCheckChange(id)}
        >
          <Icon
            className={cn('size-5 transition-colors', {
              'text-grey-200': !isSelect,
              'text-orange-57': isSelect,
            })}
            name="general:check-circle"
          />
        </button>
      </div>
    </div>
  )
}
