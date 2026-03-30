import { usePluginManager } from '@kubb/core/hooks'
import { camelCase } from '@kubb/core/transformers'
import type { KubbFile } from '@kubb/fabric-core/types'
import { createReactGenerator } from '@kubb/plugin-oas/generators'
import { useOas, useOperationManager } from '@kubb/plugin-oas/hooks'
import { getBanner, getFooter } from '@kubb/plugin-oas/utils'
import type { PluginClient } from '@kubb/plugin-client'
import { File, Function } from '@kubb/react-fabric'

const toKebabCase = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const groupedClientGenerator =
  createReactGenerator<PluginClient>({
    name: 'groupedClient',
    Operations({ operations, generator, plugin }) {
      const { options, key: pluginKey } = plugin
      const pluginManager = usePluginManager()

      const oas = useOas()
      const { getName, getFile, getGroup } =
        useOperationManager(generator)

      const controllers = operations.reduce(
        (acc, operation) => {
          if (options.group?.type === 'tag') {
            const group = getGroup(operation)
            const fileName = group?.tag
              ? `${toKebabCase(group.tag)}-service`
              : undefined
            const exportName = group?.tag
              ? camelCase(`${group.tag} service`)
              : undefined

            if (!group?.tag || !fileName || !exportName) {
              return acc
            }

            const file = pluginManager.getFile({
              name: fileName,
              extname: '.ts',
              pluginKey,
              options: { group },
            })

            const client = {
              name: getName(operation, { type: 'function' }),
              file: getFile(operation),
            }

            const previousFile = acc.find(
              (item) => item.file.path === file.path
            )

            if (previousFile) {
              previousFile.clients.push(client)
            } else {
              acc.push({ exportName, file, clients: [client] })
            }
          }

          return acc
        },
        [] as Array<{
          exportName: string
          file: KubbFile.File
          clients: Array<{ name: string; file: KubbFile.File }>
        }>
      )

      return controllers.map(({ exportName, file, clients }) => {
        return (
          <File
            key={file.path}
            baseName={file.baseName}
            path={file.path}
            meta={file.meta}
            banner={getBanner({
              oas,
              output: options.output,
              config: pluginManager.config,
            })}
            footer={getFooter({ oas, output: options.output })}
          >
            {clients.map((client) => (
              <File.Import
                key={client.name}
                name={[client.name]}
                root={file.path}
                path={client.file.path}
              />
            ))}

            <File.Source name={exportName} isExportable isIndexable>
              <Function export name={exportName}>
                {`return { ${clients.map((client) => client.name).join(', ')} }`}
              </Function>
            </File.Source>
          </File>
        )
      })
    },
  })
