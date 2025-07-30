import type { CliOptions } from '../types'
import { createServer } from './server'
import { getPathsByOptions, log } from './util'

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
    return 'DEV_MODE'
}
