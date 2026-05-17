import { SelectContent } from './components/select-content'
import { SelectControl } from './components/select-control'
import { SelectOptions } from './components/select-options'
import { SelectRoot } from './components/select-root'
import { useBaseSelect } from './hooks/useBaseSelect'
import { createBaseSelectContext } from './context'
import { type SelectProps } from './types'

// todo forwardRef
export const BaseSelect = <T,>({
  isSingleAutoToggle = true,
  ...rest
}: SelectProps<T>) => {
  const props: SelectProps<T> = {
    isSingleAutoToggle,
    ...rest,
  }
  const { renderContentTop } = rest
  const SelectContext = createBaseSelectContext<T>()
  const contextProps = useBaseSelect(props)

  return (
    <SelectContext.Provider value={contextProps}>
      <SelectRoot>
        <SelectControl />
        <SelectContent>
          {renderContentTop}
          <SelectOptions />
        </SelectContent>
      </SelectRoot>
    </SelectContext.Provider>
  )
}
