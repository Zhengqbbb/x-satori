import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'

import { satoriAstro } from 'x-satori/astro'
import { Resvg } from '@resvg/resvg-js'
import { Jimp, JimpMime } from 'jimp'
import type { CollectionEntry } from 'astro:content'

const _DIRNAME = import.meta.env?.PROD
    // Please ensure __dirname. Astro __dirname in dist folder on PROD (astro build) time 🫠
    ? resolve(dirname(fileURLToPath(import.meta.url)), '../../../src/og')
    : dirname(fileURLToPath(import.meta.url))

export async function getPostImageBuffer(props: CollectionEntry<'blog'>) {
    const template = await readFile(resolve(_DIRNAME, './Template.astro'), 'utf-8')
    const base = (await import('./config')).default
    // Default export is a singleton; parallel prerender must not mutate shared `props`.
    const config = {
        ...base,
        props: {
            ...base.props,
            ...props.data,
        },
    }
    const svg = await satoriAstro(config, template)
    const resvg = new Resvg(svg, {
        font: {
            loadSystemFonts: false,
        },
        fitTo: {
            mode: 'width',
            value: 1200,
        },
        imageRendering: 0,
    })
    const pngData = resvg.render()
    const pngBuffer = pngData.asPng()
    const image = await Jimp.read(pngBuffer)
    return await image.getBuffer(JimpMime.jpeg, { quality: 50 })
}
