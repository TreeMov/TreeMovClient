import type { IconProps } from '../icon/types'

import {
  type VirtualItem,
  type Virtualizer,
} from '@tanstack/react-virtual'

import { type MaybePromise, type Prettify } from '@/types/utility'

import { type SelectBaseOptionItemProps } from './components/select-base-option/types'
import { type SelectTrigger } from './components/select-trigger'

export type SelectValue = {
  label: string
  value: string
}

export type SelectOptionType = SelectValue & {
  disabled?: boolean
  render?: (
    props: Omit<SelectBaseOptionItemProps, 'render'>,
    cn: string
  ) => React.ReactNode
}

export type RenderControlParams<T> = {
  isOpen: boolean
  value: string | null
  classNames: string
  triggerClassName?: string
  TriggerWrapper: typeof SelectTrigger
} & Pick<SelectContextType<T>, 'toggleOpen'>

export type BaseSelectProps<T> = Prettify<
  {
    isMultiple?: boolean
    value: T
    options: SelectOptionType[]
    isClearable: boolean
    placeholder?: string
    isLoading?: boolean
    hasValue: boolean
    hasMore?: boolean
    renderFooter?: React.ReactNode
    renderValue: React.ReactNode
    noOptionsMessage?: string
    startIcon?: React.ReactNode
    isModal?: boolean
    contentClassName?: string
    disabled?: boolean
    renderContentTop?: React.ReactNode
    indicatorIcon?: Pick<IconProps, 'name' | 'className'>
    isSingleAutoToggle?: boolean
    renderControl?: (
      params: RenderControlParams<T>
    ) => React.ReactNode
    checkSelected: (option: SelectOptionType) => boolean
    onOptionClick: (param: {
      option: SelectOptionType
      isSelected: boolean
    }) => void
    onSearch?: (inputValue: string) => MaybePromise<unknown>
    onLoadMore?: () => void
    onChange: (value: T) => void
    onResetSearch?: () => void
    onReset: () => T
  } & Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>
>

export type SelectProps<T> = Prettify<BaseSelectProps<T>>

export type SelectContextType<T> = Prettify<
  SelectProps<T> & {
    inputValue: string
    isOpen: boolean
    hasOptions: boolean
    hasInputValue: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    toggleOpen: () => void
  }
>

export type FormSelectProps<T> = Prettify<
  Omit<
    SelectProps<T>,
    | 'isMultiple'
    | 'isClearable'
    | 'hasValue'
    | 'renderFooter'
    | 'renderValue'
    | 'onReset'
    | 'checkSelected'
    | 'onOptionClick'
  > &
    Partial<Pick<SelectProps<T>, 'isClearable'>>
>

export type OnOptionClickParams = {
  option: SelectOptionType
  isSelected: boolean
}

export type SelectTriggerProps = React.PropsWithChildren<{
  className?: string
  disabled?: boolean
}>

export type SelectOptionsListProps = {
  items: VirtualItem[]
  virtualHeight: number
  isVirtual: boolean
  measureElement: Virtualizer<
    HTMLDivElement,
    Element
  >['measureElement']
}

export type SelectOptionWrapperProps = {
  idx: number
  loaderRef: React.Ref<HTMLDivElement>
  isVirtual: boolean
  vItem?: VirtualItem
  measureElement: Virtualizer<
    HTMLDivElement,
    Element
  >['measureElement']
}
