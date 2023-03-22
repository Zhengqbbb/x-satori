import { readFile } from 'node:fs/promises'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import type { SatoriOptions } from '../vue'
import { satoriVue } from '../vue'
import { getPathOpts, log } from './util'

export const generateSVG = async (tempP?: string, cfgP?: string, out?: string) => {
    const { tempPath, configPath } = getPathOpts(tempP, cfgP)
    const temp = await readFile(tempPath, 'utf8')
    const cfgTmp = await (await import('vite')).loadConfigFromFile(
        {} as any,
        configPath,
    )
    const config = cfgTmp?.config as SatoriOptions || {}
    const svg = await satoriVue(config, temp)
    if (!out) {
        console.log(svg)
    }
    else {
        writeFileSync(resolve(process.cwd(), out), svg, 'utf8')
        log('I', resolve(process.cwd(), out))
    }
}
