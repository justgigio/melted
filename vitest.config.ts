import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        enabled: true,
        provider: 'v8',
        exclude: [
          ...configDefaults.coverage.exclude!,
          'src/main.ts',
          'src/App.vue',
          'tests/e2e/*',
          'src/components/**/*',
          'src/views/**/*',
          'nightwatch.conf.cjs'
        ]
      }
    }
  })
)
