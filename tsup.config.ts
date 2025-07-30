import { defineConfig } from 'tsup'

export default defineConfig(
    [
        {
            entry: [
                './src/cli.ts',
                './src/vue.ts',
                './src/astro.ts',
                './src/index.ts',
            ],
            format: 'esm',
            outDir: './dist',
            dts: true,
            clean: true,
            external: [
                'vue',
                'vite',
                'astro',
                '@astrojs/compiler',
                '@vue/compiler-sfc',
            ],
            outExtension: ({ format }) =>
                ({ js: format === 'esm' ? '.mjs' : '.cjs' }),
        },
    ],
)
