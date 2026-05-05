import type {
  Control,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'

export type BaseDisplayInputFormProps = {
  label?: string
  description?: string
  isRequired?: boolean
}

export type BaseInputFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = BaseDisplayInputFormProps & {
  formItemClassName?: string
  name: TName
  control?: Control<TFieldValues, unknown, TTransformedValues>
  controllerProps?: Omit<
    UseControllerProps<TFieldValues, TName, TTransformedValues>,
    'name' | 'control'
  >
}
