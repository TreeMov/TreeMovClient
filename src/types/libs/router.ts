// ссылка на конфу с объяснениями https://www.youtube.com/watch?v=woABfqsgRZc

import { type RouteObject } from 'react-router'

import { type Prettify } from '../utility'

type ExtractPath<T extends string> = T extends `:${infer Param}`
  ? Param
  : never

type ExtractPaths<T extends string> =
  T extends `${infer Left}/${infer Right}`
    ? ExtractPaths<Left> | ExtractPaths<Right>
    : ExtractPath<T>

export type PathParams<T extends string> = Record<
  ExtractPaths<T>,
  string
>

export type Args<T extends string> =
  Record<string, never> extends PathParams<T>
    ? { path: T }
    : { path: T; params: Prettify<PathParams<T>> }

export type ExtractConfig<T extends RouteObject> =
  T['id'] extends string
    ? { [K in T['id']]: T['path'] } & Prettify<
        ExtractChildren<T['children']>
      >
    : Prettify<ExtractChildren<T['children']>>

type ExtractChildren<T extends RouteObject[] | undefined> =
  T extends [
    infer Head extends RouteObject,
    ...infer Tail extends RouteObject[],
  ]
    ? ExtractConfig<Head> & ExtractChildren<Tail>
    : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      {}
