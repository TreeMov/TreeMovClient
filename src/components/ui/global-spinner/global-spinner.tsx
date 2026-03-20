import React from 'react'

import { Spinner } from '../spinner'

export const GlobalSpinner: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner className="size-16" />
    </div>
  )
}
