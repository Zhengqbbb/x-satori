import { style } from './style'

export function generateHelp(version: string) {
    // prettier-ignore
    console.info(
        `${style.yellow('NAME:')}
    ${style.green('x-satori')} - use Vue or Astro file to generate SVG images using Satori

${style.yellow('WEBSITE:')}
    ${style.underline('https://github.com/Zhengqbbb/x-satori')}

${style.yellow('VERSION:')} ${version}

${style.yellow('SYNOPSIS:')}
    x-satori --template <template_file_path> --config <satori_config_path> [--props <JSON>] \\
        [ --output <svg_path> | --dev [--host --port <num>] ]

${style.yellow('OPTIONS:')}
    ${style.cyan('-d|--dev')}                   ${style.red('Turn on Dev mode')}
       ${style.cyan('--host')}                  ${style.red('Expose  host in Dev mode')}
       ${style.cyan('--port     <num>')}        ${style.red('Specify port in Dev mode')}
    ${style.cyan('-t|--template <path>')}       ${style.red('The Vue or Astro template file path')}
    ${style.cyan('-c|--config   <path>')}       ${style.red('The export satori configure file path')}
    ${style.cyan('-o|--output   <path>')}       ${style.red('Target output SVG path')}
    ${style.cyan('--props       <JSON_str>')}   ${style.red('Overwrite and use props in config')}

${style.yellow('EXAMPLES:')}
    ${style.cyan('x-satori --config "./satori.js" --template "./Template.vue" --dev --host')}
    ${style.cyan('x-satori --config "./satori.js" --template "./Template.astro"')}
    ${style.cyan('x-satori --config "./satori.js" --template "./Template.astro" --props \'{"title": "Hello World"}\'')}
    ${style.cyan('x-satori --config "./satori.js" --template "./Template.vue" -o image.svg')}
`,
    )
}
