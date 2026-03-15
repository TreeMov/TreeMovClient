import { useState } from 'react'

export const useSteps = <
  Schema extends object,
  Sequence extends string[],
>(
  sequence: Sequence,
  setFormValues: React.Dispatch<React.SetStateAction<Schema>>,
  nextHandler: () => void
) => {
  const [currentStep, setCurrentStep] = useState<Sequence[number]>(
    sequence[0]
  )

  const currentStepIdx = sequence.findIndex(
    (step) => step === currentStep
  )
  const onNext = () => {
    const nextStep = sequence[currentStepIdx + 1]

    if (nextStep) {
      setCurrentStep(nextStep)
    }
  }

  const onNextHandler = (data: Partial<Schema>, nextStep = true) => {
    setFormValues((prev) => ({ ...prev, ...data }))
    if (nextStep) {
      onNext()
    }
  }

  const onSubmit = <K extends Partial<Schema>>(data: K) => {
    onNextHandler(data, false)
    nextHandler()
  }

  return { onSubmit, onNextHandler, currentStep }
}
