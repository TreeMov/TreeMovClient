import {
  type FieldValues,
  useFormContext,
  type UseFormReturn,
} from 'react-hook-form'

export const ConnectForm = <
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>({
  children,
}: {
  children: (
    data: UseFormReturn<TFieldValues, TContext, TTransformedValues>
  ) => React.ReactNode
}) => {
  const methods = useFormContext<
    TFieldValues,
    TContext,
    TTransformedValues
  >()

  return children(methods)
}
