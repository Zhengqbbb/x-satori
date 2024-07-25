import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineSatoriConfig } from 'x-satori/vue'

const _FONT_DIR = resolve(dirname(
    fileURLToPath(import.meta.url),
), '../../public/fonts')

export default defineSatoriConfig({
    height: 628,
    width: 1200,
    props: {
        // default
        title: 'VitePress',
        desc: 'Markdown to Beautiful Docs in Minutes',
        site: 'https://vitepress.dev',
    },
    fonts: [
        {
            name: 'Inter',
            data: await readFile(resolve(_FONT_DIR, './Inter-Medium.woff')),
            weight: 400,
            style: 'normal',
        },
        {
            name: 'Inter',
            data: await readFile(resolve(_FONT_DIR, './Inter-Bold.woff')),
            weight: 700,
            style: 'normal',
        },
        {
            name: 'Noto Sans Symbols',
            data: await readFile(resolve(_FONT_DIR, './NotoSansSymbols2-Regular.ttf')),
            weight: 700,
            style: 'normal',
        },
    ],
})
