import process from 'node:process'
import { readFile } from 'node:fs/promises'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { CliOptions } from '../types'
import { getPathsByOptions, getSatoriConfig, log } from './util'

export async function generateSVG(
    tempP: string,
    cfgP: string,
    argv: CliOptions,
    out?: string,
) {
    const { tempPath, configPath } = getPathsByOptions(tempP, cfgP)
    const satoriSVGParser = tempPath.endsWith('.vue')
        ? (await import('../vue')).default
        : (await import('../astro')).default
    const temp = await readFile(tempPath, 'utf8')
    const config = await getSatoriConfig(configPath, argv)

    const svg = await satoriSVGParser(config, temp)
    if (!out) {
        console.log(svg)
    }
    else {
        writeFileSync(resolve(process.cwd(), out), svg, 'utf8')
        log('I', resolve(process.cwd(), out))
    }
}
