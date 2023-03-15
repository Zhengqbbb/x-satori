import { satoriVue, type SatoriOptions } from 'x-satori/vue'
import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'path'

(async function() {

    const _DIRNAME = typeof __dirname !== 'undefined'
        ? __dirname
        : dirname(fileURLToPath(import.meta.url))
    const _OUTPUT = resolve(_DIRNAME, './image/og.svg')

    const templateStr = await readFile(resolve(_DIRNAME, './Template.vue'), 'utf8')
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
            site: 'https://qbb.sh'
        }
    }
    const strSVG = await satoriVue(opt, templateStr)

    await writeFile(_OUTPUT, strSVG)

}()).catch((err: Error) => {
  console.error(err)
  process.exit(1)
})
