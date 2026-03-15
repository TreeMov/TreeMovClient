import type { NonUndefined } from 'react-hook-form'

export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>
}

export type NonUndefinedFields<T> = {
  [P in keyof T]: NonUndefined<T[P]>
}

export type UndefinedFields<T> = {
  [P in keyof T]: T[P] | undefined
}

export type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

export type RequireAtLeastOne<
  T,
  Keys extends keyof T = keyof T,
> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type PartialSome<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>

export type MaybePromise<T> = T | Promise<T>
