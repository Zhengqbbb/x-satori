import type { SatoriOptions } from './types'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'pathe'
import { html } from 'satori-html'
import satori, { init } from 'satori/wasm'
import initYoga from 'yoga-wasm-web'

export async function initEnv() {
    const _dirname = typeof __dirname !== 'undefined'
        ? __dirname
        : dirname(fileURLToPath(import.meta.url))

    const yoga = await initYoga(
        // yoga.wasm from yoga-wasm-web/dist/yoga.wasm
        await readFile((resolve(_dirname, './yoga.wasm'))),
    )
    init(yoga)
}

export async function genSatoriSVG(opts: SatoriOptions, renderedHtmlStr: string) {
    return await satori(
        html(renderedHtmlStr),
        opts,
    )
}
