import type { GroupSelectContextType } from './types'

import React, { useState } from 'react'

import { GroupSelectContext } from './context'

export const GroupSelect: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const hasSelectedIds = selectedIds.length > 0

  const isSelected = (id: number) => selectedIds.includes(id)

  const onCheckChange = (id: number) => {
    if (isSelected(id)) {
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id))
    } else {
      setSelectedIds((prev) => [...prev, id])
    }
  }

  const onReset = () => setSelectedIds([])

  const value: GroupSelectContextType = {
    selectedIds,
    hasSelectedIds,
    isSelected,
    onCheckChange,
    onReset,
  }

  return (
    <GroupSelectContext.Provider value={value}>
      {children}
    </GroupSelectContext.Provider>
  )
}
