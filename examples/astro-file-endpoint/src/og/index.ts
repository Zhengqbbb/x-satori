import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'

import { satoriAstro } from 'x-satori/astro'
import { Resvg } from '@resvg/resvg-js'
import Jimp from 'jimp'
import type { CollectionEntry } from 'astro:content'

const _DIRNAME = import.meta.env?.PROD
    // Please ensure __dirname. Astro __dirname in dist folder on PROD (astro build) time 🫠
    ? resolve(dirname(fileURLToPath(import.meta.url)), '../../../src/og')
    : dirname(fileURLToPath(import.meta.url))

export async function getPostImageBuffer(props: CollectionEntry<'blog'>) {
    const template = await readFile(resolve(_DIRNAME, './Template.astro'), 'utf-8')
    const config = (await import('./config')).default
    config.props = {
        ...config.props,
        ...props.data,
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
    image.quality(50) // quality: 0-100
    return await image.getBufferAsync(Jimp.MIME_JPEG)
}
