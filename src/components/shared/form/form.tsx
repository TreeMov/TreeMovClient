import type { IFormProps } from './types'

import { useImperativeHandle, useRef } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'

import { Form as UForm } from '@/components/ui/form'

export const Form = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>({
  useFormProps,
  children,
  onSubmit,
  ref,
  ...props
}: IFormProps<TFieldValues, TContext, TTransformedValues>) => {
  const formRef = useRef<HTMLFormElement>(null)
  const methods = useForm<TFieldValues, TContext, TTransformedValues>(
    useFormProps
  )

  useImperativeHandle(ref, () => ({ ...methods, formRef }), [methods])

  return (
    <UForm {...methods}>
      <form
        ref={formRef}
        onSubmit={methods.handleSubmit(onSubmit)}
        {...props}
      >
        {children}
      </form>
    </UForm>
  )
}
