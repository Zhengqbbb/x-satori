import type { CliOptions } from '../types'
import { getPathsByOptions, log } from './util'
import { createServer } from './server'

export async function startDevServe(
    tempP: string,
    cfgP: string,
    version: string,
    argv: CliOptions,
) {
    const { tempPath, configPath } = getPathsByOptions(tempP, cfgP)
    const server = await createServer(tempPath, configPath, argv)
    await server.listen(undefined)
    log('I', `v${version}`)
    server.printUrls()
}
