import Color from 'color'

import { randomNumber } from './utility'

export const generateRandomRgbColor = () => {
  return Color.rgb(
    randomNumber(255),
    randomNumber(255),
    randomNumber(255)
  )
}

export const generateRandomHexColor = () =>
  generateRandomRgbColor().hex()
