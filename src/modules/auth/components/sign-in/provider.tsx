import type { FormValuesContextType, SignInSchema } from './types'

import React, { useMemo, useState } from 'react'

import { FormValuesContext } from './context'

export const FormProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [formValues, setFormValues] = useState<SignInSchema>({
    email: '',
    password: '',
  })

  const value = useMemo<FormValuesContextType>(
    () => ({ ...formValues, setFormValues }),
    [formValues]
  )

  return (
    <FormValuesContext.Provider value={value}>
      {children}
    </FormValuesContext.Provider>
  )
}
