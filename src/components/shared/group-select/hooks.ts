import { useContext } from 'react'

import { GroupSelectContext } from './context'

export const useGroupSelect = () => {
  return useContext(GroupSelectContext)
}
