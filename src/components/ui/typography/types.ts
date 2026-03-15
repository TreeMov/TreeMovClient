import type { VariantProps } from 'class-variance-authority'
import type { typographyVariants } from './constants'

export type TypographyProps = VariantProps<
  typeof typographyVariants
> & { className?: string }
