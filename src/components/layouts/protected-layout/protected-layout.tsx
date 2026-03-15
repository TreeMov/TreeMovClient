import React from 'react'
import { Navigate, Outlet } from 'react-router'

import { session } from '@/api/session'
import { paths } from '@/router'

export const ProtectedLayout: React.FC = () => {
  if (!session.hasSession()) {
    return <Navigate to={paths['sign-up']} />
  }

  return <Outlet />
}
