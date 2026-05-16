import { readFile } from 'node:fs/promises'
import { cwd } from 'node:process'
import { resolve } from 'node:path'

import { defineSatoriConfig } from 'x-satori/astro'

import * as Meta from '../consts' /** @see package.json `pnpm dev:og` => For CLI using a relative path */

/** Public assets (fonts) — use cwd so paths work in dev and when config is bundled under dist/.prerender */
const _PUB_DIR = resolve(cwd(), 'public')

export default defineSatoriConfig({
    height: 628,
    width: 1200,
    props: {
        title: Meta.SITE_TITLE,
        description: Meta.SITE_DESCRIPTION,
        site: Meta.SITE,
    },
    fonts: [
        {
            name: 'Atkinson',
            data: await readFile(resolve(_PUB_DIR, './fonts/atkinson-regular.woff')),
            weight: 400,
            style: 'normal',
        },
        {
            name: 'Atkinson',
            data: await readFile(resolve(_PUB_DIR, './fonts/atkinson-bold.woff')),
            weight: 700,
            style: 'normal',
        },
        {
            name: 'Noto Sans Symbols',
            data: await readFile(resolve(_PUB_DIR, './fonts/NotoSansSymbols2-Regular.ttf')),
            weight: 700,
            style: 'normal',
        },
    ],
})
