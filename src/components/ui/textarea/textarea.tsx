import type { TextareaProps } from './types'

import * as React from 'react'

import { cn } from '@/utils/helpers//shadcn'

import { textareaVariants } from './constants'

const Textarea: React.FC<TextareaProps> = ({
  className,
  variant,
  ...props
}) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Textarea }
