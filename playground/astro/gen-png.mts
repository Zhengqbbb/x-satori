import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderAsync } from '@resvg/resvg-js'
import { satoriAstro } from 'x-satori/astro'

(async function () {
    const _DIRNAME = typeof __dirname !== 'undefined'
        ? __dirname
        : dirname(fileURLToPath(import.meta.url))
    const _OUTPUT = resolve(_DIRNAME, './og.png')

    const templateStr = await readFile(resolve(_DIRNAME, './Template.astro'), 'utf8')
    const satoriConfig = (await import('./config')).default
    const strSVG = await satoriAstro(satoriConfig, templateStr)

    const render = await renderAsync(strSVG, {
        fitTo: {
            mode: 'width',
            value: 1200,
        },
    })
    return await writeFile(_OUTPUT, render.asPng())
}()).catch(async (err: Error) => {
    console.error(err)
    await import('node:process').then(({ exit }) => exit(1))
})
