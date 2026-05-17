import { type GetValueParams } from './types'

export const getValueLabel = ({
  hasValue,
  placeholder,
  valuePrefix,
  value,
  allOptions,
}: GetValueParams) => {
  if (!hasValue) {
    return placeholder
  }

  if (valuePrefix) {
    const postFix = value.length > 1 ? `+${value.length - 1}` : null
    const valueParts = [`${valuePrefix}: ${value[0].label}`, postFix]
    const filteredParts = valueParts.filter(Boolean)
    return filteredParts.join(' ')
  }
  if (allOptions) {
    return `${placeholder}: Все`
  }

  return value.length > 1
    ? `${placeholder}: ${value.length}`
    : value[0].label
}
