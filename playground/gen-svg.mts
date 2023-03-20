import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'path'
import { satoriVue } from 'x-satori/vue'

(async function () {
    const _DIRNAME = typeof __dirname !== 'undefined'
        ? __dirname
        : dirname(fileURLToPath(import.meta.url))
    const _OUTPUT = resolve(_DIRNAME, './image/og.svg')

    const templateStr = await readFile(resolve(_DIRNAME, './Template.vue'), 'utf8')
    const satoriConfig = (await import('./config')).default
    const strSVG = await satoriVue(satoriConfig, templateStr)

    await writeFile(_OUTPUT, strSVG)
}()).catch((err: Error) => {
    console.error(err)
    process.exit(1)
})
