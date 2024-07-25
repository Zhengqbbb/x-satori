// @ts-expect-error
import { copy } from 'cpx2'
import { resolve } from 'pathe'
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
            onSuccess: async () => {
                copy(
                    resolve(__dirname, 'src/yoga.wasm'),
                    resolve(__dirname, 'dist'),
                    { force: true },
                )
            },
        },
    ],
)
