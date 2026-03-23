import React from 'react'

import { useNavigate } from '@/hooks/use-navigate'
import { useSteps } from '@/modules/auth/hooks'
import { paths } from '@/router/contract'

import { SignInStep } from '../../../steps'
import { stepSequence } from '../../constants'
import { useFormValues } from '../../hooks'

export const Content: React.FC = () => {
  const navigate = useNavigate()

  const { setFormValues } = useFormValues()

  const { currentStep, onSubmit } = useSteps(
    stepSequence,
    setFormValues,
    () => {
      navigate({ to: { path: paths.analytics } })
    }
  )

  switch (currentStep) {
    case 'sign-in':
      return <SignInStep onNext={onSubmit} />
  }
}
