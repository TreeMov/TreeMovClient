import { type RefObject, useEffect } from 'react'

type Event = MouseEvent | TouchEvent

export const useClickOutside = (
  refs: RefObject<HTMLElement | null>[],
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const someEl = refs.some((item) => {
        const el = item?.current

        return !el || el.contains((event?.target as Node) || null)
      })

      if (someEl) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [refs, handler])
}
