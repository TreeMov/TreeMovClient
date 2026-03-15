import type { IconName } from './types'

import { spritesConfig } from './constants'
import { sprites } from './sprite.gen'

export const getIconMeta = (name: IconName) => {
  const [spriteName, iconName] = name.split(':')
  const item = sprites.experimental_get(
    spriteName!,
    iconName!,
    spritesConfig
  )

  if (!item) {
    // eslint-disable-next-line no-console
    console.error(
      `Icon "${name}" is not found in "${spriteName}" sprite`
    )
    return sprites.experimental_get('general', 'help', spritesConfig)!
  }

  return item
}
