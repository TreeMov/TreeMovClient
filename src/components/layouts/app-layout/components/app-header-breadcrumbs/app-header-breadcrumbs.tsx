import type { RoutePage } from '@/types/router'

import React from 'react'
import { useMatches } from 'react-router'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/utils/helpers/shadcn'

export const AppHeaderBreadcrumbs: React.FC = () => {
  const [, , , match] = useMatches()
  const { handle } = match
  const _handle = handle as RoutePage['handle']

  if (!_handle?.breadcrumbs) {
    return null
  }

  const breadcrumbs = _handle.breadcrumbs
  const breadcrumbsCount = _handle.breadcrumbs.length
  const isManyBreadcrumbs = breadcrumbsCount > 1

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {_handle.breadcrumbs.map((key, idx) => (
          <React.Fragment key={key}>
            <BreadcrumbItem>
              <BreadcrumbPage
                className={cn({
                  'text-grey-500':
                    isManyBreadcrumbs && idx === breadcrumbsCount - 1,
                })}
              >
                {key}
              </BreadcrumbPage>
            </BreadcrumbItem>
            {idx !== breadcrumbs.length - 1 && (
              <BreadcrumbSeparator>
                <Typography size="xl">
                  <span>/</span>
                </Typography>
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
