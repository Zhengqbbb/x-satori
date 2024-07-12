import process from 'node:process'
import { readFile } from 'node:fs/promises'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { SatoriOptions } from '../types'
import { getPathOpts, log } from './util'

export async function generateSVG(tempP?: string, cfgP?: string, out?: string) {
    const { tempPath, configPath } = getPathOpts(tempP, cfgP)
    const virtualParser = tempPath.endsWith('.vue')
        ? (await import('../vue')).default
        : (await import('../astro')).default
    const temp = await readFile(tempPath, 'utf8')
    const cfgTmp = await (await import('vite')).loadConfigFromFile(
        {} as any,
        configPath,
    )
    const config = cfgTmp?.config as SatoriOptions || {}
    const svg = await virtualParser(config, temp)
    if (!out) {
        console.log(svg)
    }
    else {
        writeFileSync(resolve(process.cwd(), out), svg, 'utf8')
        log('I', resolve(process.cwd(), out))
    }
}
