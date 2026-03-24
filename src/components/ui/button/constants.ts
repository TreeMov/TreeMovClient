import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-violet-600 text-white disabled:bg-violet-600/60',
        outlined:
          'border-grey-200 border bg-white disabled:opacity-50',
        ghost: 'bg-transparent',
      },
      size: {
        sm: 'h-8 gap-1 rounded-lg px-2.5 py-1.5 [&>svg]:size-3',
        md: 'h-9 gap-1 rounded-xl px-3.5 py-2.5 [&>svg]:size-4',
        lg: 'h-10 gap-1.5 rounded-2xl px-2.5 py-3 [&>svg]:size-6',
        xl: 'h-12 gap-1.5 rounded-2xl px-2.5 py-3 [&>svg]:size-8',
        'icon-xxs': 'size-4 rounded-sm',
        'icon-xs': 'size-6 rounded-md',
        'icon-sm': 'size-8 rounded-lg',
        'icon-md': 'size-9 rounded-xl',
        'icon-lg': 'size-10 rounded-2xl',
        'icon-xl': 'size-12 rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export { buttonVariants }
