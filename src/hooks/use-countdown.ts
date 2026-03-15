import { useCallback, useEffect, useState } from 'react'

type Options = {
  interval?: number
  enabled?: boolean
  onTick?: () => void
  onComplete?: () => void
}

export const useCountdown = (
  endTime: number,
  {
    interval = 1000,
    enabled = true,
    onTick,
    onComplete,
  }: Options = {}
) => {
  const [value, setValue] = useState<number>(endTime)

  // для обновления таймера при обновлении пропса
  useEffect(() => {
    setValue(endTime)
  }, [endTime])

  useEffect(() => {
    if (!enabled) {
      return
    }
    const checkComplete = (value: number) => value <= 0
    const intervalId = setInterval(() => {
      onTick?.()
      setValue((prev) => {
        let nextValue = prev - interval / 1000
        if (checkComplete(nextValue)) {
          nextValue = 0
          onComplete?.()
          clearInterval(intervalId)
        }
        return nextValue
      })
    }, interval)

    return () => {
      clearInterval(intervalId)
    }
  }, [enabled, interval, onComplete, onTick, value])

  const retry = useCallback(() => {
    setValue(endTime)
  }, [endTime])

  return { value, retry }
}
