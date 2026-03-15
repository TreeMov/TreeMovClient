import type { HeaderProps } from './components/header/types'

export type PageLayoutProps = HeaderProps & {
  actions?: React.ReactNode
  scrollable?: boolean
}
