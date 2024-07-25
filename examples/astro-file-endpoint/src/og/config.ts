import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { defineSatoriConfig } from 'x-satori/astro'

import * as Meta from '../consts' /** @see package.json `pnpm dev:og` => For CLI using a relative path */

const _PUB_DIR = import.meta.env?.PROD
    ? resolve(dirname(fileURLToPath(import.meta.url)), '../')
    : resolve(dirname(fileURLToPath(import.meta.url)), '../../public')

export default defineSatoriConfig({
    height: 628,
    width: 1200,
    props: {
        title: Meta.SITE_TITLE,
        desc: Meta.SITE_DESCRIPTION,
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
