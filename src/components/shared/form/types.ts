import {
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form'

export interface IFormRef<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> extends UseFormReturn<TFieldValues, TContext, TTransformedValues> {
  formRef: React.Ref<HTMLFormElement | null>
}

export interface IFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>
  extends
    React.PropsWithChildren,
    Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  useFormProps?: UseFormProps<
    TFieldValues,
    TContext,
    TTransformedValues
  >
  ref?: React.Ref<
    IFormRef<TFieldValues, TContext, TTransformedValues>
  >
  onSubmit: SubmitHandler<TTransformedValues>
}
