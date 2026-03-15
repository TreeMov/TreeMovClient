import type {
  FormFieldContextValue,
  FormItemContextValue,
} from './types'

import * as React from 'react'

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

export { FormFieldContext, FormItemContext }
