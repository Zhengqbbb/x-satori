import antfu from '@antfu/eslint-config'

export default antfu(
    {
        vue: true,
        astro: true,
        yaml: false,
        markdown: false,
        stylistic: { indent: 4 },
        overrides: {
            jsonc: {
                'indent': ['error', 2],
                'jsonc/indent': ['error', 2],
            },
            javascript: {
                'no-console': 'off',
            },
            typescript: {
                'ts/ban-ts-comment': 'off',
            },
        },
        ignores: [
            'bin',
            'examples/astro-file-endpoint',
            'examples/vue-vitepress',
        ],
    },
    [
        // `ignores` is path globs only, not rule names. Demo workspaces keep plain semver for degit/copy.
        {
            files: ['examples/**/package.json', 'playground/**/package.json'],
            rules: {
                'pnpm/json-enforce-catalog': 'off',
            },
        },
    ],
)
