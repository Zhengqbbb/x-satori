import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { exit } from 'node:process'
import { type SatoriOptions, satoriVue } from 'x-satori/vue'

(async function () {
    const _DIRNAME = typeof __dirname !== 'undefined'
        ? __dirname
        : dirname(fileURLToPath(import.meta.url))
    const _OUTPUT = resolve(_DIRNAME, './image/og.svg')

    const opt: SatoriOptions = {
        height: 628,
        width: 1200,
        fonts: [
            {
                name: 'Inter',
                data: await readFile(resolve(_DIRNAME, './fonts/Inter-Medium.woff')),
                weight: 400,
                style: 'normal',
            },
            {
                name: 'Inter',
                data: await readFile(resolve(_DIRNAME, './fonts/Inter-Bold.woff')),
                weight: 700,
                style: 'normal',
            },
            {
                name: 'Noto Sans Symbols',
                data: await readFile(resolve(_DIRNAME, './fonts/NotoSansSymbols2-Regular.ttf')),
                weight: 700,
                style: 'normal',
            },
        ],
        props: {
            title: 'hello world',
            desc: 'examples',
            site: 'https://qbb.sh',
        },
    }
    const templateStr = await readFile(resolve(_DIRNAME, './Template.vue'), 'utf8')
    const strSVG = await satoriVue(opt, templateStr)

    await writeFile(_OUTPUT, strSVG)
}()).catch((err: Error) => {
    console.error(err)
    exit(1)
})
