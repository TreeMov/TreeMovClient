import path from 'node:path'
import process from 'node:process'
import { spawn } from 'node:child_process'

const ROOT_DIR = path.resolve(import.meta.dirname, '..')
const target = process.argv[2] ?? '.'
const prettierEntry = path.join(
  ROOT_DIR,
  'node_modules',
  'prettier',
  'bin',
  'prettier.cjs'
)
const child = spawn(
  process.execPath,
  [prettierEntry, '--write', '--ignore-unknown', target],
  {
    cwd: ROOT_DIR,
    stdio: 'inherit',
  }
)

child.on('exit', (code) => {
  process.exit(code ?? 1)
})

child.on('error', (error) => {
  console.error(error)
  process.exit(1)
})
