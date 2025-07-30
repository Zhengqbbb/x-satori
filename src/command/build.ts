import type { CliOptions } from '../types'
import { Buffer } from 'node:buffer'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'
import { Readable } from 'node:stream'
import { getPathsByOptions, getSatoriConfig, log } from './util'

export async function writeStringToStdout(inputString: string): Promise<void> {
    return new Promise((resolve) => {
        if (!inputString.endsWith('\n'))
            inputString += '\n'
        let buffer = Buffer.from(inputString)

        const rawStream = new Readable({
            read() {
                if (buffer.length === 0) {
                    this.push(null)
                    resolve()
                }
                else {
                    const chunkSize = 1024 // 1KB
                    const chunk = buffer.subarray(0, chunkSize)
                    buffer = buffer.subarray(chunkSize)
                    this.push(chunk)
                }
            },
        })

        rawStream.pipe(process.stdout)
    })
}

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
        await writeStringToStdout(svg)
    }
    else {
        await writeFile(resolve(process.cwd(), out), svg, 'utf8')
        log('I', resolve(process.cwd(), out))
    }
}
