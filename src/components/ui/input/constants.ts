import { cva } from 'class-variance-authority'

const inputVariants = cva(
  'flex w-full cursor-text items-center shadow-xs transition-[color,background,border,box-shadow] outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-grey-100 border-grey-100 aria-invalid:border-destructive placeholder:text-grey-500 data-[disabled=true]:bg-grey-200 text-black hover:border-violet-400 data-[focused=true]:border-violet-400',
        underline:
          'rounded-none! border-b border-black bg-transparent [&_input]:text-center',
      },
      size: {
        sm: 'h-6 gap-1 rounded-xl px-3 [&>svg]:size-4',
        md: 'h-8 gap-1 rounded-xl px-3 [&>svg]:size-6',
        lg: 'h-10 gap-1.5 rounded-xl px-4 [&>svg]:size-8',
        xl: 'h-12 gap-2 rounded-xl px-4 [&>svg]:size-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export { inputVariants }
