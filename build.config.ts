import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    entries: [
        'src/cli',
        'src/vue',
        'src/astro',
        'src/index',
    ],
    declaration: true,
    clean: true,
    rollup: {
        inlineDependencies: true,
        replace: {
            values: {
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: false,
            },
        },
    },
    externals: [
        'vue',
        'vite',
        'astro',
        '@astrojs/compiler',
    ],
})
