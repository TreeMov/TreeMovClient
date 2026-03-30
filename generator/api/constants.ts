const concatLines = (lines: string[]) => `${lines.join(' \n ')}\n`

export const banner = concatLines([
  '/* eslint-disable @typescript-eslint/no-explicit-any */',
  '/* eslint-disable @typescript-eslint/no-unused-vars */',
  '/* eslint-disable @typescript-eslint/ban-ts-comment */',
  '/* eslint-disable no-duplicate-imports */',
  '// @ts-nocheck',
])

export const HTTP_METHODS = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'options',
  'head',
  'trace',
] as const
