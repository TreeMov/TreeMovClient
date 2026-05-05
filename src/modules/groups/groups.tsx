import React from 'react'

import { PageLayout } from '@/components/layouts/page-layout'

import { Content, Footer, Header } from './components'
import { GroupsProvider } from './provider'

export const Groups: React.FC = () => {
  return (
    <GroupsProvider>
      <PageLayout actions={<Header />} footer={<Footer />}>
        <Content />
      </PageLayout>
    </GroupsProvider>
  )
}
