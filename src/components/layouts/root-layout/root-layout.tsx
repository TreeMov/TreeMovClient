import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NuqsAdapter } from 'nuqs/adapters/react'
import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router'

import { QueryClientProvider } from '@/components/providers/query-client-provider'

export const RootLayout: React.FC = () => {
  return (
    <QueryClientProvider>
      <NuqsAdapter>
        <ScrollRestoration />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </NuqsAdapter>
    </QueryClientProvider>
  )
}
