import type { HeaderProps } from './components/header/types'

export type PageLayoutProps = HeaderProps & {
  actions?: React.ReactNode
  footer?: React.ReactNode
  scrollable?: boolean
}
