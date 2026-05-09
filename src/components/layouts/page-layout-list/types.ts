import type { PageLayoutProps } from '../page-layout/types'
import type { FooterProps } from './components/footer/types'

export type PageLayoutListProps = Omit<PageLayoutProps, 'footer'> &
  FooterProps
