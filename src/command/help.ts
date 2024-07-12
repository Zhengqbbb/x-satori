import process from 'node:process'
import { style } from './style'

export function generateHelp(version: string, code = 0) {
    // prettier-ignore
    console.log(
        `${style.yellow('NAME:')}
    ${style.green('x-satori')} - use Vue or Astro file to generate SVG images using Satori

${style.yellow('WEBSITE:')}
    ${style.underline('https://github.com/Zhengqbbb/x-satori')}

${style.yellow('VERSION:')} ${version}

${style.yellow('SYNOPSIS:')}
    x-satori --template <template_file_path> --config <satori_config_path> [ --output <path> | --dev ]

${style.yellow('OPTIONS:')}
    ${style.cyan('-d|--dev')}                   ${style.red('Turn on Dev mode')}
    ${style.cyan('-t|--template <path>')}       ${style.red('The Vue or Astro template file path')}
    ${style.cyan('-c|--config   <path>')}       ${style.red('The export satori configure file path')}
    ${style.cyan('-o|--output   <path>')}       ${style.red('Target output SVG path')}

${style.yellow('EXAMPLES:')}
    ${style.cyan('x-satori --config "./satori.js" --template "./Template.vue" --dev')}
    ${style.cyan('x-satori --config "./satori.js" --template "./Template.astro"')}
    ${style.cyan('x-satori --config "./satori.js" --template "./Template.vue" -o image.svg')}
`,
    )
    process.exit(code)
}
