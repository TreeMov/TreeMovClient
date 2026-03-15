import { type RouteObject } from 'react-router'

import {
  type Args,
  type ExtractConfig,
  type PathParams,
} from '@/types/libs/router'
import { type Prettify } from '@/types/utility'

export const generateRouteMap = <T extends RouteObject>(
  config: T[]
): ExtractConfig<T> =>
  config.reduce<ExtractConfig<T>>((acc, route) => {
    if (route.children) {
      return { ...acc, ...generateRouteMap(route.children) }
    }
    if (!route.id) {
      return acc
    }
    return { ...acc, [route.id]: route.path }
  }, {} as ExtractConfig<T>)

const invariant = (value: unknown, message: string) => {
  if (!value) {
    throw new Error(message)
  }
}

const warning = (condition: boolean, message: string) => {
  if (!condition) {
    // eslint-disable-next-line no-console
    if (typeof console !== 'undefined') console.warn(message)
    try {
      // Welcome to debugging history!
      //
      // This error is thrown as a convenience, so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message)
      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (e) {}
  }
}

export const generatePath = <T extends string>(
  args: Args<T>
): string => {
  const { path: originalPath } = args
  let path = originalPath
  let params: Prettify<PathParams<T>>
  // todo избавиться от оператора in
  if ('params' in args) {
    params = args.params
  }

  if (path.endsWith('*') && path !== '*' && !path.endsWith('/*')) {
    warning(
      false,
      'Route path "' +
        path +
        '" will be treated as if it were ' +
        ('"' +
          path.replace(/\*$/, '/*') +
          '" because the `*` character must ') +
        'always follow a `/` in the pattern. To get rid of this warning, ' +
        ('please change the route path to "' +
          path.replace(/\*$/, '/*') +
          '".')
    )
    path = path.replace(/\*$/, '/*') as T
  }

  // ensure `/` is added at the beginning if the path is absolute
  const prefix = path.startsWith('/') ? '/' : ''

  const stringify = (p: unknown) =>
    p == null ? '' : typeof p === 'string' ? p : String(p)

  const segments = path
    .split(/\/+/)
    .map((segment, index, array) => {
      const isLastSegment = index === array.length - 1

      // only apply the splat if it's the last segment
      if (isLastSegment && segment === '*') {
        const star = '*'
        // Apply the splat
        return stringify(
          params?.[star as unknown as keyof PathParams<T>]
        )
      }
      const keyMatch = segment.match(/^:([\w-]+)(\??)$/)
      if (keyMatch) {
        const [, key, optional] = keyMatch
        const param = params?.[key as keyof PathParams<T>]
        invariant(
          optional === '?' || param != null,
          'Missing ":' + key + '" param'
        )
        return stringify(param)
      }

      // Remove any optional markers from optional static segments
      return segment.replace(/\?$/g, '')
    })
    // Remove empty segments
    .filter((segment) => !!segment)
  return prefix + segments.join('/')
}
