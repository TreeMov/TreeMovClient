import {
  type ControllerProps,
  type FieldError,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'

// Рендер пропсы компонента Controller
type IControllerRenderProps<
  F extends FieldValues = FieldValues,
  N extends FieldPath<F> = FieldPath<F>,
  T = F,
> = Parameters<ControllerProps<F, N, T>['render']>[number]

// Специфичные пропсы для рендера компонента ControllerField
type IControllerFieldRenderProps<
  F extends FieldValues = FieldValues,
  N extends FieldPath<F> = FieldPath<F>,
  T = F,
> = {
  name: string
  children: (
    values: IControllerRenderProps<F, N, T> & {
      error: FieldError | undefined
      isError: boolean
    }
  ) => React.ReactElement
}

// Пропсы компонента ControllerField
export type IControllerFieldProps<
  F extends FieldValues = FieldValues,
  N extends FieldPath<F> = FieldPath<F>,
  T = F,
> = Omit<ControllerProps<F, N, T>, 'render'> &
  IControllerFieldRenderProps<F, N, T>
