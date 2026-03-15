import type { Direction } from 'radix-ui'
import type * as React from 'react'

export type DirectionProviderProps = React.ComponentProps<
  typeof Direction.DirectionProvider
> & {
  direction?: React.ComponentProps<
    typeof Direction.DirectionProvider
  >['dir']
}
