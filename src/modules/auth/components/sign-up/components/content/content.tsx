import React from 'react'

import { useNavigate } from '@/hooks/use-navigate'
import { useSteps } from '@/modules/auth/hooks'
import { paths } from '@/router'

import { CodeStep, OrgStep, SignUpStep } from '../../../steps'
import { stepSequence } from '../../constants'
import { useFormValues } from '../../hooks'

export const Content: React.FC = () => {
  const navigate = useNavigate()

  const { setFormValues, ...rest } = useFormValues()
  const { email, password } = rest

  const { currentStep, onNextHandler, onSubmit } = useSteps(
    stepSequence,
    setFormValues,
    () => {
      navigate({ to: { path: paths.analytics } })
    }
  )

  switch (currentStep) {
    case 'sign-up':
      return <SignUpStep onNext={onNextHandler} />
    case 'code':
      return <CodeStep onNext={onNextHandler} email={email} />
    case 'org':
      return (
        <OrgStep
          email={email}
          password={password}
          onNext={onSubmit}
        />
      )
  }
}
