import { cva } from 'class-variance-authority'

import { cn } from '@/utils/helpers/shadcn'

const textareaVariants = cva(
  cn(
    'relative flex field-sizing-content max-h-30 min-h-20 w-full resize-none px-3 py-2 text-base transition-[color,box-shadow] outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'placeholder:text-muted-foreground'
  ),

  {
    variants: {
      variant: {
        primary:
          'border-grey-200 aria-invalid:border-destructive aria-invalid:ring-destructive/20 rounded-md border bg-transparent',
        underline:
          'border-grey-200 aria-invalid:border-destructive rounded-none border-0 border-b bg-transparent px-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

export { textareaVariants }
