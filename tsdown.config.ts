import { defineConfig } from 'tsdown'

export default defineConfig({
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
    platform: 'node',
    deps: {
        skipNodeModulesBundle: true,
    },
    outExtensions({ format }) {
        if (format === 'es')
            return { js: '.mjs' }
    },
})
