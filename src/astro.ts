import fs from 'node:fs'
import crypto from 'node:crypto'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
// @ts-expect-error
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { transform } from '@astrojs/compiler'
import { genSatoriSVG, initEnv } from './core'
import type { SatoriOptions } from './types'

export { type SatoriOptions }
export { defineSatoriConfig } from './'

export async function satoriAstro(opts: SatoriOptions, astroTemplateStr: string) {
    await initEnv()

    const ___dirname = dirname(fileURLToPath(import.meta.url))
    const rawHash = crypto.createHash('md5').update(astroTemplateStr).digest('hex')
    const tmpFile = resolve(
        ___dirname,
        '.tmp',
        `x-satori-${rawHash}.js`,
    )
    if (!fs.existsSync(tmpFile)) {
        const { code: tsCode } = await transform(
            astroTemplateStr,
            {
                filename: tmpFile,
                sourcemap: 'external',
                internalURL: 'astro/runtime/server/index.js',
                resolvePath: async s => s,
            },
        )
        const { transformSync } = await import('esbuild')
        const { code: jsCode } = transformSync(tsCode, { loader: 'ts' })
        fs.mkdirSync(resolve(___dirname, '.tmp'), { recursive: true })
        fs.writeFileSync(tmpFile, jsCode, 'utf-8')
    }
    const templateComponent = await (await import(tmpFile)).default

    const container = await AstroContainer.create()
    const renderedHtmlStr = await container.renderToString(
        templateComponent,
        {
            props: opts.props,
        },
    )
    return await genSatoriSVG(opts, renderedHtmlStr)
}

export default satoriAstro
