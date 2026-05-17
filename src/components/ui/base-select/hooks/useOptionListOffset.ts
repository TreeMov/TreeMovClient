import { useEffect, useRef } from 'react'

import {
  handleNonVirtualListOffset,
  handleVirtualListOffset,
  type HandleVirtualListOffsetParams,
} from '../helpers'

export type UseOptionListOffset = HandleVirtualListOffsetParams & {
  isVirtual: boolean
}

export const useOptionListOffset = ({
  isVirtual,
  ...params
}: UseOptionListOffset) => {
  const { parentRef } = params
  const isEffectLaunched = useRef(false)

  const calculateOffset = (node: HTMLElement | null) => {
    if (!node) {
      return null
    }

    let currentNode: HTMLElement | null = node
    let iterationCount = 0

    while (currentNode && iterationCount < 50000) {
      if (currentNode.dataset.slot === 'popover-content-inner') {
        const styles = window.getComputedStyle(currentNode)

        return {
          top: Number.parseFloat(styles.paddingTop),
          bottom: Number.parseFloat(styles.paddingBottom),
        }
      }

      currentNode = currentNode.parentElement
      iterationCount += 1
    }

    return null
  }

  useEffect(() => {
    if (isEffectLaunched.current) {
      return
    }
    isEffectLaunched.current = true

    const offset = calculateOffset(parentRef.current)

    if (!isVirtual) {
      handleNonVirtualListOffset({ ...params, offset: offset?.top })
    } else {
      handleVirtualListOffset({ ...params, offset: offset?.top })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
