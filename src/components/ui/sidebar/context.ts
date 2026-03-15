import type { SidebarContextProps } from './types'

import * as React from 'react'

const SidebarContext =
  React.createContext<SidebarContextProps | null>(null)

export { SidebarContext }
