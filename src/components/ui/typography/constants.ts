import { cva } from 'class-variance-authority'

const typographyVariants = cva('', {
  variants: {
    variant: {
      primary: 'text-black',
      white: 'text-white',
      grey: 'text-grey-500',
    },
    size: {
      '4xl': 'text-5xl font-bold',
      '2xl': 'text-4xl font-bold',
      xl: 'text-3xl font-bold',
      lg: 'text-2xl font-bold',
      md: 'text-xl',
      sm: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export { typographyVariants }
