import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NuqsAdapter } from 'nuqs/adapters/react'
import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router'

import { QueryClientProvider } from '@/components/providers/query-client-provider'
import { Toaster } from '@/components/ui/sonner'

export const RootLayout: React.FC = () => {
  return (
    <QueryClientProvider>
      <NuqsAdapter>
        <ScrollRestoration />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </NuqsAdapter>
    </QueryClientProvider>
  )
}
