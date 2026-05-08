import type { StudentGroupModelRead } from '@/api/generated/core'

import React from 'react'

import { useGroupSelect } from '@/components/shared/group-select/hooks'
import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/utils/helpers/shadcn'

export const GroupCard: React.FC<StudentGroupModelRead> = ({
  id,
  title,
}) => {
  const { isSelected, onCheckChange } = useGroupSelect()

  const isSelect = isSelected(id)

  return (
    <div
      className={cn(
        'relative rounded-xl border border-white bg-white p-4 transition-colors',
        { 'border-orange-57': isSelect }
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <Typography size="sm" className="font-bold text-black">
          <p>{title}</p>
        </Typography>
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
