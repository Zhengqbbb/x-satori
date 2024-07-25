import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import { createContentLoader } from 'vitepress'
import { satoriVue } from 'x-satori/vue'
import { Resvg } from '@resvg/resvg-js'
import type { SiteConfig } from 'vitepress'

const _DIRNAME = dirname(fileURLToPath(import.meta.url))

export async function generateOGImage(siteConfig: SiteConfig) {
    const pages = await createContentLoader('**/*.md', { excerpt: true }).load()
    const template = await readFile(resolve(_DIRNAME, './Template.vue'), 'utf-8')
    const config = (await import('./config')).default

    const _OUTPUT_DIR = resolve(_DIRNAME, '../dist/og')
    return await Promise.all(
        pages.map(async (page) => {
            if (['/', '404.html'].includes(page.url))
                return

            config.props = {
                ...config.props,
                title: page.frontmatter.title ?? siteConfig.userConfig.title,
                desc: page.frontmatter.description ?? siteConfig.userConfig.description,
            }
            const svg = await satoriVue(config, template)
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
            const file = resolve(_OUTPUT_DIR, `./${page.url.replace(/\.(md|html)$/, '.png')}`)
            await writeFile(file, pngData.asPng())
            return file
        }),
    )
}
