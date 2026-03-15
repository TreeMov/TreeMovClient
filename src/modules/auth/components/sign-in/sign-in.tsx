import React from 'react'

import { Content } from './components/content'
import { FormProvider } from './provider'

export const SignIn: React.FC = () => {
  return (
    <FormProvider>
      <Content />
    </FormProvider>
  )
}
