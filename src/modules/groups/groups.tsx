import React from 'react'

import { PageLayout } from '@/components/layouts/page-layout'

import { Footer } from './components/footer'
import { Content, Header } from './components'
import { GroupsProvider } from './provider'

export const Groups: React.FC = () => {
  return (
    <GroupsProvider>
      <PageLayout
        breadcrumbs={['Группы', 'Основное']}
        actions={<Header />}
        footer={<Footer />}
      >
        <Content />
      </PageLayout>
    </GroupsProvider>
  )
}
