import path from 'node:path'
import process from 'node:process'
import { spawn } from 'node:child_process'

const ROOT_DIR = path.resolve(import.meta.dirname, '..')
const target = process.argv[2] ?? './src'
const eslintEntry = path.join(
  ROOT_DIR,
  'node_modules',
  'eslint',
  'bin',
  'eslint.js'
)
const child = spawn(
  process.execPath,
  [eslintEntry, '--max-warnings=0', '--fix', target],
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
