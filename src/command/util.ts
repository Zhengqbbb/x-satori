/* eslint-disable indent */
import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { createStyle } from './style'

export function log(type: 'I' | 'W' | 'E', msg: string, help?: string) {
    const pc = createStyle()
    const { ___X_CMD_THEME_COLOR_CODE } = process.env
    const pcInf = ___X_CMD_THEME_COLOR_CODE ? pc.rgb(___X_CMD_THEME_COLOR_CODE) : pc.green
    switch (type) {
        case 'I':
            console.log(`- ${pcInf('I|x-satori')}: ${msg}`)
            if (help)
                console.log(`  ${pcInf('help:')} ${help}`)
            return
        case 'W':
            console.warn(`${pc.yellow('-')} ${pc.yellow(pc.inverse('W'))}${pc.yellow((`|x-satori: ${pc.bold(msg)}`))}`)
            if (help)
                console.warn(`  ${pcInf('help:')} ${pc.bold(help)}`)
            return
        case 'E':
            console.error(`${pc.red('-')} ${pc.red(pc.inverse('E'))}${pc.red((`|x-satori: ${pc.bold(msg)}`))}`)
            if (help)
                console.error(`  ${pc.red('help:')} ${pc.bold(help)}`)
    }
}

export const getPathOpts = (tempP?: string, cfgP?: string) => {
    if (!tempP || !cfgP) {
        log('E', 'Please provide options --template <vue_path> and --config <satori_cfg_path>', '`x-satori --help`')
        console.error(`  template_path: ${tempP}`)
        console.error(`  config_path: ${cfgP}`)
        process.exit(1)
    }
    const cwd = process.cwd()
    const tempPath = resolve(cwd, tempP)
    const configPath = resolve(cwd, cfgP)
    if (
        !existsSync(tempPath)
     || !existsSync(configPath)
    ) {
        log('E', 'File NOT Found. Please check files exsit')
        console.error(`  template_path: ${tempPath}`)
        console.error(`  config_path: ${configPath}`)
        process.exit(1)
    }
    return { tempPath, configPath }
}
