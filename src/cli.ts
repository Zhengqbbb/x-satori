import process from 'node:process'
import minimist from 'minimist'
import { version } from '../package.json'
import { generateSVG } from './command/build'
import { startDevServe } from './command/dev'
import { generateHelp } from './command/help'
import type { CliOptions } from './types'

process.on('uncaughtException', (err) => {
    console.error(err.message || err)
    process.exit(1)
})

export async function main(argvs = process.argv) {
    const parsedArgv = minimist<CliOptions>(argvs.slice(2, argvs.length), {
        alias: {
            v: 'version',
            h: 'help',
            d: 'dev',
            t: 'template',
            c: 'config',
            o: 'output',
        },
    })

    if (parsedArgv.dev) {
        await startDevServe(
            parsedArgv?.template,
            parsedArgv?.config,
            version,
            parsedArgv,
        )
        return 'NO_EXIT'
    }
    else if (parsedArgv.version) {
        console.info(version)
    }
    else if (parsedArgv.help) {
        generateHelp(version)
    }
    else {
        await generateSVG(
            parsedArgv?.template,
            parsedArgv?.config,
            parsedArgv,
            parsedArgv.output,
        )
    }
}

main()
    .then((signal) => {
        if (signal !== 'NO_EXIT') {
            process.exit(0)
        }
    })
    .catch((err) => {
        console.error(err.message || err)
        process.exit(1)
    })
