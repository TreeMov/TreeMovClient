import type { StudentGroupModelRead } from '@/api/generated/core'

import React from 'react'

import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/utils/helpers/shadcn'

import { useGroups } from '../../hooks'

export const GroupCard: React.FC<StudentGroupModelRead> = ({
  id,
  title,
}) => {
  const {
    selectedGroupsIds,
    setSelectedGroupsIds,
    checkSelectedGroup,
  } = useGroups()

  const isSelected = checkSelectedGroup(id)

  const onToggle = () => {
    if (selectedGroupsIds[id]) {
      setSelectedGroupsIds((prev) =>
        prev.filter((groupId) => groupId !== id)
      )
    } else {
      setSelectedGroupsIds((prev) => [...prev, id])
    }
  }

  return (
    <div
      className={cn(
        'relative rounded-xl border border-white bg-white p-4 transition-colors',
        { 'border-orange-57': isSelected }
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <Typography size="sm" className="font-bold text-black">
          <p>{title}</p>
        </Typography>
        <button className="cursor-pointer" onClick={onToggle}>
          <Icon
            className={cn('size-5 transition-colors', {
              'text-grey-200': !isSelected,
              'text-orange-57': isSelected,
            })}
            name="general:check-circle"
          />
        </button>
      </div>
    </div>
  )
}
