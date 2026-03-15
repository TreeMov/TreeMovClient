import type { AuthLayoutProps } from './types'

import React from 'react'

import { Icon } from '@/components/ui/icon'
import { Typography } from '@/components/ui/typography'

export const AuthLayout: React.FC<
  React.PropsWithChildren<AuthLayoutProps>
> = ({ title, description, children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center py-24">
      <div className="flex w-full max-w-148.75 flex-col items-center justify-center gap-7.5 rounded-3xl bg-white px-27.5 py-12">
        <div className="flex items-center gap-1.5">
          <Icon name="general:logo" className="text-violet-600" />
          <Typography size="xl">
            <p>TreeMov</p>
          </Typography>
        </div>
        <div className="w-full">
          <Typography className="mb-7.5 text-center" size="2xl">
            <h2>{title}</h2>
          </Typography>
          <Typography
            className="mb-7.5 text-center"
            variant="grey"
            size="md"
          >
            <p>{description}</p>
          </Typography>
          {children}
        </div>
      </div>
    </div>
  )
}
