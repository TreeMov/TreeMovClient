import type { SubjectsContextType } from './types'

import React, { useState } from 'react'

import { SubjectsContext } from './context'

export const SubjectsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [selected, setSelected] = useState<number[]>([])

  const value: SubjectsContextType = {
    selectedSubjectsIds: selected,
    setSelectedSubjectsIds: setSelected,
  }

  return (
    <SubjectsContext.Provider value={value}>
      {children}
    </SubjectsContext.Provider>
  )
}
