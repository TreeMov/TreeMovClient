import { spawn } from 'node:child_process'
import { promises as fs, watch as watchFs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import ts from 'typescript'

type RouteEntry = {
  id: string
  path: string
}

type ParsedFile = {
  sourceFile: ts.SourceFile
  text: string
}

const ROOT_DIR = path.resolve(import.meta.dirname, '../..')
const SRC_DIR = path.join(ROOT_DIR, 'src')
const ROUTER_INDEX_PATH = path.join(SRC_DIR, 'router', 'index.tsx')
const ROUTES_MAP_PATH = path.join(
  SRC_DIR,
  'utils',
  'constants',
  'routes-map.ts'
)
const CONTRACT_PATH = path.join(SRC_DIR, 'router', 'contract.ts')
const PAGES_DIR = path.join(SRC_DIR, 'pages')
const runNpmScriptForFile = async (
  scriptName: 'prettier' | 'lint:fix',
  filePath: string
) => {
  const relativeFilePath = path
    .relative(ROOT_DIR, filePath)
    .split(path.sep)
    .join('/')
  const child =
    process.platform === 'win32'
      ? spawn(
          'cmd.exe',
          [
            '/d',
            '/c',
            'npm',
            'run',
            scriptName,
            '--',
            relativeFilePath,
          ],
          {
            cwd: ROOT_DIR,
            stdio: 'inherit',
          }
        )
      : spawn('npm', ['run', scriptName, '--', relativeFilePath], {
          cwd: ROOT_DIR,
          stdio: 'inherit',
        })

  await new Promise<void>((resolve, reject) => {
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(
        new Error(
          `npm run ${scriptName} failed for ${relativeFilePath} with exit code ${code ?? 'unknown'}`
        )
      )
    })
  })
}

const unwrapExpression = (
  expression: ts.Expression
): ts.Expression => {
  if (ts.isParenthesizedExpression(expression)) {
    return unwrapExpression(expression.expression)
  }
  if (ts.isAsExpression(expression)) {
    return unwrapExpression(expression.expression)
  }
  if (ts.isSatisfiesExpression(expression)) {
    return unwrapExpression(expression.expression)
  }
  return expression
}

const readSource = async (filePath: string): Promise<ParsedFile> => {
  const text = await fs.readFile(filePath, 'utf8')
  const scriptKind = filePath.endsWith('.tsx')
    ? ts.ScriptKind.TSX
    : ts.ScriptKind.TS
  const sourceFile = ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    scriptKind
  )
  return { sourceFile, text }
}

const resolveLocalModulePath = (
  fromFile: string,
  specifier: string
) => {
  const base = specifier.startsWith('@/')
    ? path.join(SRC_DIR, specifier.slice(2))
    : path.resolve(path.dirname(fromFile), specifier)

  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    path.join(base, 'index.ts'),
    path.join(base, 'index.tsx'),
    path.join(base, 'index.js'),
    path.join(base, 'index.jsx'),
  ]

  return candidates.find((candidate) => ts.sys.fileExists(candidate))
}

const getStringLiteralValue = (node: ts.Expression) =>
  ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)
    ? node.text
    : null

const parseRoutesMap = async () => {
  const { sourceFile } = await readSource(ROUTES_MAP_PATH)
  const routes: Record<string, string> = {}

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue

    for (const declaration of statement.declarationList
      .declarations) {
      if (!ts.isIdentifier(declaration.name)) continue
      if (declaration.name.text !== 'ROUTES') continue
      if (!declaration.initializer) continue
      const expression = unwrapExpression(declaration.initializer)
      if (!ts.isObjectLiteralExpression(expression)) continue

      for (const property of expression.properties) {
        if (!ts.isPropertyAssignment(property)) continue
        if (!ts.isIdentifier(property.name)) continue
        const value = getStringLiteralValue(property.initializer)
        if (!value) continue
        routes[property.name.text] = value
      }
    }
  }

  return routes
}

const findExportedRouteInFile = async (
  filePath: string,
  exportName: string,
  routesMap: Record<string, string>,
  visited: Set<string>
): Promise<RouteEntry | null> => {
  if (visited.has(filePath)) return null
  visited.add(filePath)

  const text = await fs.readFile(filePath, 'utf8')
  const routeDeclarationRegex =
    /export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*\{([\s\S]*?)\}\s*as\s+const/g
  for (const match of text.matchAll(routeDeclarationRegex)) {
    const declarationName = match[1]
    const objectBody = match[2]
    if (declarationName !== exportName) continue

    const idMatch = objectBody.match(/id\s*:\s*['"]([^'"]+)['"]/)
    const pathLiteralMatch = objectBody.match(
      /path\s*:\s*['"]([^'"]+)['"]/
    )
    const pathRouteMapMatch = objectBody.match(
      /path\s*:\s*ROUTES\.([A-Za-z_$][A-Za-z0-9_$]*)/
    )

    if (!idMatch) continue

    const routePath =
      pathLiteralMatch?.[1] ??
      (pathRouteMapMatch
        ? routesMap[pathRouteMapMatch[1]]
        : undefined)

    if (routePath) {
      return { id: idMatch[1], path: routePath }
    }
  }

  const exportAllRegex = /export\s+\*\s+from\s+['"]([^'"]+)['"]/g
  for (const match of text.matchAll(exportAllRegex)) {
    const targetFile = resolveLocalModulePath(filePath, match[1])
    if (!targetFile) continue

    const route = await findExportedRouteInFile(
      targetFile,
      exportName,
      routesMap,
      visited
    )
    if (route) return route
  }

  const exportNamedRegex =
    /export\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]/g
  for (const match of text.matchAll(exportNamedRegex)) {
    const targetFile = resolveLocalModulePath(filePath, match[2])
    if (!targetFile) continue

    const specifiers = match[1].split(',').map((item) => item.trim())
    for (const specifier of specifiers) {
      if (!specifier) continue

      const [left, right] = specifier
        .split(/\s+as\s+/)
        .map((v) => v.trim())
      const importedAs = left
      const exportedAs = right ?? left
      if (exportedAs !== exportName) continue

      const route = await findExportedRouteInFile(
        targetFile,
        importedAs,
        routesMap,
        visited
      )
      if (route) return route
    }
  }

  return null
}

const collectRoutesFromRouterText = async (
  routerFileText: string,
  routesMap: Record<string, string>
) => {
  const routes: RouteEntry[] = []
  const seen = new Set<string>()
  const importMap = new Map<string, string>()

  const importRegex =
    /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]([^'"]+)['"]/g

  for (const match of routerFileText.matchAll(importRegex)) {
    const specifiers = match[1]
    const moduleSpecifier = match[2]
    const resolvedModulePath = resolveLocalModulePath(
      ROUTER_INDEX_PATH,
      moduleSpecifier
    )
    if (!resolvedModulePath) continue

    for (const rawItem of specifiers.split(',')) {
      const item = rawItem.trim()
      if (!item) continue
      const [left, right] = item.split(/\s+as\s+/)
      const localName = (right ?? left)?.trim()
      if (!localName) continue
      importMap.set(localName, resolvedModulePath)
    }
  }

  const routerConfigStart = routerFileText.indexOf(
    'export const routerConfig'
  )
  const routerConfigEnd = routerFileText.indexOf(
    'export const router',
    routerConfigStart
  )
  const configText =
    routerConfigStart >= 0 && routerConfigEnd > routerConfigStart
      ? routerFileText.slice(routerConfigStart, routerConfigEnd)
      : routerFileText

  const identifierRegex = /\b[A-Za-z_$][A-Za-z0-9_$]*Route\b/g
  const orderedIdentifiers: string[] = []
  const seenIdentifiers = new Set<string>()

  for (const match of configText.matchAll(identifierRegex)) {
    const identifier = match[0]
    if (!importMap.has(identifier)) continue
    if (seenIdentifiers.has(identifier)) continue
    seenIdentifiers.add(identifier)
    orderedIdentifiers.push(identifier)
  }

  for (const identifier of orderedIdentifiers) {
    const importFile = importMap.get(identifier)
    if (!importFile) continue

    const route = await findExportedRouteInFile(
      importFile,
      identifier,
      routesMap,
      new Set<string>()
    )
    if (!route) continue
    if (seen.has(route.id)) continue

    seen.add(route.id)
    routes.push(route)
  }

  return routes
}

const createContractFileContent = (routes: RouteEntry[]) => {
  const entries = routes
    .map(({ id, path: routePath }) => {
      return `  ${JSON.stringify(id)}: ${JSON.stringify(routePath)},`
    })
    .join('\n')

  return `/* prettier-ignore-start */
/**
 * This file is auto-generated by generator/router/generate-router-contract.ts
 * Do not edit this file manually.
 */

export const paths = {
${entries}
} as const

export type RouteId = keyof typeof paths
export type PathsKeys = (typeof paths)[RouteId]
export type PathById<T extends RouteId> = (typeof paths)[T]
/* prettier-ignore-end */
`
}

const generateRouterContract = async () => {
  const routesMap = await parseRoutesMap()
  const { text } = await readSource(ROUTER_INDEX_PATH)

  const routes = await collectRoutesFromRouterText(text, routesMap)
  if (!routes.length) {
    throw new Error('No routes were collected from routerConfig')
  }

  const output = createContractFileContent(routes)
  const currentOutput = await fs
    .readFile(CONTRACT_PATH, 'utf8')
    .catch(() => null)

  if (currentOutput === output) {
    // eslint-disable-next-line no-console
    console.log(
      `Router contract is up to date (${routes.length} routes)`
    )
    return
  }

  await fs.writeFile(CONTRACT_PATH, output, 'utf8')
  await runNpmScriptForFile('prettier', CONTRACT_PATH)
  await runNpmScriptForFile('lint:fix', CONTRACT_PATH)

  // eslint-disable-next-line no-console
  console.log(
    `Generated ${path.relative(ROOT_DIR, CONTRACT_PATH)} (${routes.length} routes)`
  )
}

const startWatchMode = async () => {
  await generateRouterContract()

  let timer: ReturnType<typeof setTimeout> | null = null
  const scheduleRegeneration = () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      generateRouterContract().catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error('[router-contract] Generation failed:', error)
      })
    }, 150)
  }

  const watchers = [
    watchFs(ROUTER_INDEX_PATH, scheduleRegeneration),
    watchFs(ROUTES_MAP_PATH, scheduleRegeneration),
    watchFs(PAGES_DIR, { recursive: true }, scheduleRegeneration),
  ]

  const shutdown = () => {
    for (const watcher of watchers) {
      watcher.close()
    }
    if (timer) {
      clearTimeout(timer)
    }
    // eslint-disable-next-line no-console
    console.log('[router-contract] Watch mode stopped')
    process.exit(0)
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)

  // eslint-disable-next-line no-console
  console.log('[router-contract] Watching route sources...')
}

const isWatchMode = process.argv.includes('--watch')
const runner = isWatchMode ? startWatchMode : generateRouterContract

runner().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
