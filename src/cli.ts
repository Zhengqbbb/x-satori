import process from 'node:process'
import minimist from 'minimist'
import { generateSVG } from './command/build'
import { startDevServe } from './command/dev'
import { generateHelp } from './command/help'
import type { CliOptions } from './types'

process.on('uncaughtException', (err) => {
    console.error(err.message || err)
    process.exit(1)
})

// catch SIGINT signal like control+c
process.stdin.on('data', (key: any) => {
    // eslint-disable-next-line eqeqeq
    if (key == '\u0003')
        process.exit(130) // 128 + SIGINT
})

export async function bootsrap(argvs = process.argv) {
    const { version } = await import('../package.json')
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
        return await startDevServe(
            parsedArgv?.template,
            parsedArgv?.config,
            version,
            parsedArgv,
        )
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

bootsrap()
    .then((mode) => {
        if (mode !== 'DEV_MODE') {
            process.exit(0)
        }
    })
    .catch((err) => {
        console.error(err.message || err)
        process.exit(1)
    })
