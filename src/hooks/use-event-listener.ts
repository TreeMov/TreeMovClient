import { useEffect } from 'react'

export const useEventListener = <
  T extends Element,
  K extends keyof DocumentEventMap,
>(
  target: React.RefObject<T | null>,
  event: K,
  listener: (evt: Event) => unknown,
  disabled?: boolean
) => {
  useEffect(() => {
    if (disabled) {
      return
    }

    const node = target.current
    node?.addEventListener(event, listener)
    return () => {
      node?.removeEventListener(event, listener)
    }
  }, [event, target, disabled, listener])
}
