import svg from '@neodx/svg/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import observerPlugin from 'mobx-react-observer/babel-plugin'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          observerPlugin({
            exclude: [
              'src/components/layouts/**',
              'src/components/providers/**',
              'src/components/ui/**',
            ],
          }),
        ],
      },
    }),
    tailwindcss(),
    svg({
      inputRoot: 'src/assets/sprites',
      output: 'public/sprites',
      group: true,
      resetColors: {},
      fileName: '{name}.{hash:8}.svg',
      metadata: 'src/components/ui/icon/sprite.gen.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
