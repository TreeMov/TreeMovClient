import { useBaseSelectContext } from '../../hooks'
import { type SelectOptionType } from '../../types'
import { SelectBaseOption } from '../select-base-option'

export const SelectOption = <T,>(props: SelectOptionType) => {
  const { value, label, disabled } = props

  const { isMultiple, toggleOpen, onOptionClick, checkSelected } =
    useBaseSelectContext<T>()

  const isSelected = checkSelected(props)

  const onClick = () => {
    onOptionClick({
      isSelected: !isSelected,
      option: { label, value, disabled },
    })
    if (!isMultiple) {
      toggleOpen()
    }
  }

  return (
    <SelectBaseOption
      isSelected={isSelected}
      {...props}
      onClick={onClick}
    />
  )
}
