import type { SelectValue } from '@/components/ui/base-select/types'

import { useBaseSelectContext } from '@/components/ui/base-select/hooks'
import { Button } from '@/components/ui/button'

import { type SelectFooterProps } from '../../types'

export const SelectFooter: React.FC<SelectFooterProps> = ({
  localValue,
  onChange: onChangeLocal,
}) => {
  const { hasOptions, hasInputValue, onChange, toggleOpen } =
    useBaseSelectContext<SelectValue[]>()

  const hasLocalValue = !!localValue.length

  const onApply = (values: SelectValue[]) => {
    onChange(values)
    toggleOpen()
  }

  const handleApply = () => onApply(localValue)

  const onClick = () => {
    onChangeLocal([])
    onApply([])
  }

  if (!hasOptions && hasInputValue) {
    return null
  }

  return (
    <div className="flex items-center gap-3 overflow-hidden px-3 py-3 pb-0">
      {hasLocalValue && (
        <Button
          className="grow"
          variant="primary"
          size="lg"
          onClick={onClick}
          disabled={!hasLocalValue}
        >
          Сбросить
        </Button>
      )}
      <Button className="grow" size="lg" onClick={handleApply}>
        Применить
      </Button>
    </div>
  )
}
