import { type Virtualizer } from '@tanstack/react-virtual'
import { type RefObject } from 'react'

import { type SelectOptionType } from './types'

export type HandleVirtualListOffsetParams = {
  parentRef: RefObject<HTMLDivElement | null>
  virtualizer: Virtualizer<HTMLDivElement, Element>
  options: SelectOptionType[]
  value: unknown
  offset?: number
}

export type HandleNonVirtualListOffsetParams = Omit<
  HandleVirtualListOffsetParams,
  'virtualizer'
>

export const findFirstSelectedIdx = ({
  options,
  value,
}: Pick<HandleVirtualListOffsetParams, 'options' | 'value'>) =>
  options.findIndex((option) =>
    Array.isArray(value)
      ? value.includes(option.value)
      : option.value === value
  )

export const handleVirtualListOffset = ({
  parentRef,
  virtualizer,
  options,
  value,
  offset,
}: HandleVirtualListOffsetParams) => {
  const idx = findFirstSelectedIdx({ options, value })

  if (idx < 0 || !parentRef.current) {
    return
  }

  const selectedMeasurement = virtualizer.measurementsCache[idx]
  const currentOffset = virtualizer.scrollOffset ?? 0
  const viewportHeight = parentRef.current?.clientHeight ?? 0
  const visibleStart = currentOffset
  const visibleEnd = currentOffset + viewportHeight
  const { start, end } = selectedMeasurement

  const nextOffset =
    start < visibleStart
      ? start
      : end > visibleEnd
        ? end - viewportHeight
        : currentOffset

  virtualizer.scrollOffset = Math.max(
    0,
    nextOffset + (offset ?? 0) * 2
  )
}

export const handleNonVirtualListOffset = ({
  options,
  value,
  parentRef,
}: HandleNonVirtualListOffsetParams) => {
  if (!parentRef.current) {
    return
  }

  const idx = findFirstSelectedIdx({ options, value })

  if (idx < 0) {
    return
  }

  const optionsNodes = parentRef.current?.querySelectorAll(
    '[data-slot="select-option"]'
  )
  if (!optionsNodes?.length) {
    return
  }

  const firstSelectedNode = optionsNodes[idx]
  const parentRect = parentRef.current.getBoundingClientRect()
  const firstSelectedNodeRect =
    firstSelectedNode.getBoundingClientRect()
  const scrollHeight = firstSelectedNodeRect.top - parentRect.top
  parentRef.current.scrollTo({ top: scrollHeight })
}
