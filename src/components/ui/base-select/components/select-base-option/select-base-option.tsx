import { Check } from 'lucide-react'

import { cn } from '@/utils/helpers/shadcn'

import { type SelectBaseOptionProps } from './types'

export const SelectBaseOption = ({
  onClick,
  ...props
}: SelectBaseOptionProps) => {
  const { disabled, isSelected } = props

  const labelClassName = 'flex items-center gap-2'

  return (
    <div
      className={cn(
        'flex w-full cursor-pointer items-start justify-between gap-4 px-4 py-2 text-left outline-none select-none'
      )}
      onClick={onClick}
    >
      {props.render ? (
        props.render(props, labelClassName)
      ) : (
        <div className={labelClassName}>
          <span className={cn({ 'pointer-none:': disabled })}>
            {props.label}
          </span>
        </div>
      )}
      {isSelected && <Check className="size-5" />}
    </div>
  )
}
