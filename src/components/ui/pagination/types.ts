import type * as React from 'react'
import type { Button } from '@/components/ui/button'

export type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>

export type PaginationProps = React.ComponentProps<'nav'>
export type PaginationContentProps = React.ComponentProps<'ul'>
export type PaginationItemProps = React.ComponentProps<'li'>
export type PaginationPreviousProps = React.ComponentProps<'a'>
export type PaginationNextProps = React.ComponentProps<'a'>
export type PaginationEllipsisProps = React.ComponentProps<'span'>
