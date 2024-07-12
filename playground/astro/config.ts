import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineSatoriConfig } from 'x-satori/astro'

const _DIRNAME = typeof __dirname !== 'undefined'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url))

export default defineSatoriConfig({
    height: 628,
    width: 1200,
    fonts: [
        {
            name: 'Inter',
            data: readFileSync(resolve(_DIRNAME, './fonts/Inter-Medium.woff')),
            weight: 400,
            style: 'normal',
        },
        {
            name: 'Inter',
            data: readFileSync(resolve(_DIRNAME, './fonts/Inter-Bold.woff')),
            weight: 700,
            style: 'normal',
        },
        {
            name: 'Noto Sans Symbols',
            data: readFileSync(resolve(_DIRNAME, './fonts/NotoSansSymbols2-Regular.ttf')),
            weight: 700,
            style: 'normal',
        },
    ],
    props: {
        title: 'Hello World!!!',
        site: 'https://qbb.sh',
    },
})
