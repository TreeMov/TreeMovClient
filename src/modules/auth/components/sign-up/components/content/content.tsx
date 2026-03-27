import React from 'react'

import { useNavigate } from '@/hooks/use-navigate'
import { useSteps } from '@/modules/auth/hooks'
import { paths } from '@/router/contract'

import { CodeStep, SignUpStep } from '../../../steps'
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
      navigate({ to: { path: paths['create-org'] } })
    }
  )

  switch (currentStep) {
    case 'sign-up':
      return <SignUpStep onNext={onNextHandler} />
    case 'code':
      return (
        <CodeStep
          onNext={onSubmit}
          email={email}
          password={password}
        />
      )
  }
}
