import fs from 'node:fs/promises'
import path from 'node:path'

const textFileExtensions = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.mts',
  '.cts',
])

const toKebabCase = (value) =>
  value
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const readDirRecursive = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await readDirRecursive(absolutePath)))
      continue
    }

    if (entry.isFile()) {
      files.push(absolutePath)
    }
  }

  return files
}

const readDirectoriesRecursive = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const directories = []

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue
    }

    const absolutePath = path.join(directory, entry.name)
    directories.push(absolutePath)
    directories.push(
      ...(await readDirectoriesRecursive(absolutePath))
    )
  }

  return directories
}

const getUniqueTargetPath = async (targetPath) => {
  const extension = path.extname(targetPath)
  const baseName = targetPath.slice(0, -extension.length)
  let candidate = targetPath
  let index = 2

  while (true) {
    try {
      await fs.access(candidate)
      candidate = `${baseName}-${index}${extension}`
      index += 1
    } catch {
      return candidate
    }
  }
}

const getUniqueTargetDirectory = async (targetPath) => {
  let candidate = targetPath
  let index = 2

  while (true) {
    try {
      await fs.access(candidate)
      candidate = `${targetPath}-${index}`
      index += 1
    } catch {
      return candidate
    }
  }
}

const renameDirectoriesToKebabCase = async (rootDirectory) => {
  const directories = await readDirectoriesRecursive(rootDirectory)
  const sortedByDepth = directories.sort(
    (a, b) => b.split(path.sep).length - a.split(path.sep).length
  )

  for (const directoryPath of sortedByDepth) {
    const parentDirectory = path.dirname(directoryPath)
    const directoryName = path.basename(directoryPath)
    const kebabName = toKebabCase(directoryName)

    if (!kebabName || kebabName === directoryName) {
      continue
    }

    const desiredTargetPath = path.join(parentDirectory, kebabName)
    const targetPath =
      await getUniqueTargetDirectory(desiredTargetPath)
    await fs.rename(directoryPath, targetPath)
  }
}

const renameFilesToKebabCase = async (rootDirectory) => {
  const files = await readDirRecursive(rootDirectory)
  const sortedByDepth = files.sort(
    (a, b) => b.split(path.sep).length - a.split(path.sep).length
  )
  const renames = []

  for (const filePath of sortedByDepth) {
    const directory = path.dirname(filePath)
    const extension = path.extname(filePath)
    const fileName = path.basename(filePath, extension)
    const kebabName = toKebabCase(fileName)

    if (!kebabName || kebabName === fileName) {
      continue
    }

    const desiredTargetPath = path.join(
      directory,
      `${kebabName}${extension}`
    )
    const targetPath = await getUniqueTargetPath(desiredTargetPath)

    await fs.rename(filePath, targetPath)
    renames.push({ oldPath: filePath, newPath: targetPath })
  }

  return renames
}

const normalizeRelativeImportPath = (importPath) =>
  importPath
    .split('/')
    .map((segment) => {
      if (!segment || segment === '.' || segment === '..') {
        return segment
      }

      const extension = path.posix.extname(segment)
      const baseName = extension
        ? segment.slice(0, -extension.length)
        : segment
      const kebabName = toKebabCase(baseName) || baseName

      return `${kebabName}${extension}`
    })
    .join('/')

const updateTextFileImports = async (rootDirectory) => {
  const textFiles = (await readDirRecursive(rootDirectory)).filter(
    (filePath) => textFileExtensions.has(path.extname(filePath))
  )

  for (const filePath of textFiles) {
    let content = await fs.readFile(filePath, 'utf8')
    const updatedContent = content.replace(
      /(["'])(\.{1,2}\/[^"'\n]+)\1/g,
      (_match, quote, relativePath) =>
        `${quote}${normalizeRelativeImportPath(relativePath)}${quote}`
    )

    if (updatedContent !== content) {
      await fs.writeFile(filePath, updatedContent)
    }
  }
}

const rootArg = process.argv[2]
if (!rootArg) {
  throw new Error('Output directory argument is required.')
}

const outputDirectory = path.resolve(process.cwd(), rootArg)
await renameDirectoriesToKebabCase(outputDirectory)
await renameFilesToKebabCase(outputDirectory)
await updateTextFileImports(outputDirectory)
