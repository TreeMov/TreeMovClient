import type { IconProps } from './types'

import { useMemo } from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { getIconMeta } from './helpers'

export const Icon: React.FC<IconProps> = ({
  className,
  name,
  ...props
}) => {
  const {
    symbol: { viewBox },
    href,
  } = useMemo(() => getIconMeta(name), [name])

  return (
    <svg
      className={cn('size-10', className)}
      viewBox={viewBox}
      focusable="false"
      {...props}
    >
      <use href={href} />
    </svg>
  )
}
