import { readFile } from 'fs/promises'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { satoriVue } from '../vue'
import { getPathOpts, log } from './util'

export const generateSVG = async (tempP?: string, cfgP?: string, out?: string) => {
    const { tempPath, configPath } = getPathOpts(tempP, cfgP)
    const temp = await readFile(tempPath, 'utf8')
    const config = await import(configPath)
    const svg = await satoriVue(Object.assign({}, config, config.default), temp)
    if (!out) {
        console.log(svg)
    }
    else {
        writeFileSync(resolve(process.cwd(), out), svg, 'utf8')
        log('I', resolve(process.cwd(), out))
    }
}
