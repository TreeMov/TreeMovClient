import { camelCase } from '@kubb/core/transformers'
import type { PluginOas } from '@kubb/plugin-oas'
import { createGenerator } from '@kubb/plugin-oas/generators'
import { getBanner, getFooter } from '@kubb/plugin-oas/utils'

export const safeJsonGenerator = createGenerator<PluginOas>({
  name: 'plugin-oas',
  async schema({ schema, generator }) {
    if (!schema.name) {
      return []
    }

    const { pluginManager, plugin } = generator.context
    const resolvedName = camelCase(schema.name)
    const file = pluginManager.getFile({
      name: resolvedName,
      extname: '.json',
      mode: 'split',
      pluginKey: plugin.key,
    })

    return [
      {
        ...file,
        sources: [
          {
            name: resolvedName,
            isExportable: false,
            isIndexable: false,
            value: JSON.stringify(schema.value),
          },
        ],
        banner: getBanner({
          oas: generator.context.oas,
          output: plugin.options.output,
          config: pluginManager.config,
        }),
        format: getFooter({
          oas: generator.context.oas,
          output: plugin.options.output,
        }),
      },
    ]
  },
})
