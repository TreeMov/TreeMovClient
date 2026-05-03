import type { GroupsContextType } from './types'

import React, { useState } from 'react'

import { GroupsContext } from './context'

export const GroupsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [selectedGroupsIds, setSelectedGroupsIds] = useState<
    number[]
  >([])

  const normalizedSelectedGroupsIds = selectedGroupsIds.reduce<
    Record<number, number>
  >((acc, id) => ({ ...acc, [id]: id }), {})

  const checkSelectedGroup = (id: number) =>
    !!normalizedSelectedGroupsIds[id]

  const value: GroupsContextType = {
    selectedGroupsIds: normalizedSelectedGroupsIds,
    setSelectedGroupsIds,
    checkSelectedGroup,
  }

  return (
    <GroupsContext.Provider value={value}>
      {children}
    </GroupsContext.Provider>
  )
}
