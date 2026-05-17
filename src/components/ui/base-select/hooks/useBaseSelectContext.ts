import { useContext } from 'react'

import { createBaseSelectContext } from '../context'

export const useBaseSelectContext = <T>() => {
  return useContext(createBaseSelectContext<T>())
}
