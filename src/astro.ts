import type { SatoriOptions } from './types'
import crypto from 'node:crypto'
import fs from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { transform } from '@astrojs/compiler'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { genSatoriSVG } from './core'

/**
 * Astro 6 SSR `createAstro` is (props, slots). Older @astrojs/compiler builds may still emit
 * `$$result.createAstro($$Astro, $$props, $$slots)`; at runtime `$$Astro` is then treated as props,
 * so props passed from `AstroContainer.renderToString` never reach the component. See Astro’s
 * createAstro two-arg vs three-arg compatibility notes.
 */
function patchLegacyCreateAstroThreeArgCall(jsCode: string): string {
    // Must use a function replacer: with a string replacement, `$$` becomes one literal `$` (ECMA-262).
    return jsCode.replace(
        /\$\$result\.createAstro\(\$\$Astro,\s*\$\$props,\s*\$\$slots\)/g,
        () => '$$result.createAstro($$props, $$slots)',
    )
}

export { type SatoriOptions }
export { defineSatoriConfig } from './'

export async function satoriAstro(opts: SatoriOptions, astroTemplateStr: string) {
    const ___dirname = dirname(fileURLToPath(import.meta.url))
    const rawHash = crypto.createHash('md5').update(astroTemplateStr).digest('hex')
    const tmpFile = resolve(
        ___dirname,
        '.tmp',
        `x-satori-${rawHash}-createAstro2args.js`,
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
        let { code: jsCode } = transformSync(tsCode, { loader: 'ts' })
        jsCode = patchLegacyCreateAstroThreeArgCall(jsCode)
        fs.mkdirSync(resolve(___dirname, '.tmp'), { recursive: true })
        fs.writeFileSync(tmpFile, jsCode, 'utf-8')
    }
    const templateComponent = await (await import(/* @vite-ignore */ tmpFile))
        .default

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
