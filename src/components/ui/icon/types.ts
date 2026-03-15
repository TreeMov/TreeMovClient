import type { SVGProps } from 'react'
import type { SpritesMeta } from './sprite.gen'

export type IconName = {
  [Key in keyof SpritesMeta]: `${Key}:${SpritesMeta[Key]}`
}[keyof SpritesMeta]

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
}
