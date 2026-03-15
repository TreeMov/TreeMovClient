import { useContext } from 'react'

import { FormValuesContext } from './context'

export const useFormValues = () => {
  return useContext(FormValuesContext)
}
