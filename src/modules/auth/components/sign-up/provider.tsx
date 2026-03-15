import type { FormValuesContextType, SignUpSchema } from './types'

import React, { useMemo, useState } from 'react'

import { FormValuesContext } from './context'

export const FormProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [formValues, setFormValues] = useState<SignUpSchema>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    code: '',
    organization: '',
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
