import React from 'react'

import { PageLayout } from '@/components/layouts/page-layout'

import { Content, Footer, Header } from './components'
import { SubjectsProvider } from './provider'

export const Subjects: React.FC = () => {
  return (
    <SubjectsProvider>
      <PageLayout actions={<Header />} footer={<Footer />}>
        <Content />
      </PageLayout>
    </SubjectsProvider>
  )
}
