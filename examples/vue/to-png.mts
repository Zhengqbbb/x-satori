import { satoriVue, type SatoriOptions } from 'x-satori/vue'
import { renderAsync } from '@resvg/resvg-js'
import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'path'

(async function () {
  const _dirname = typeof __dirname !== 'undefined'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url))
  const _output = resolve(_dirname, './image/og.png')

  const templateStr = await readFile(resolve(_dirname, './Template.vue'), 'utf8')
  const opt: SatoriOptions = {
    height: 628,
    width: 1200,
    fonts: [
      {
        name: 'Inter',
        data: await readFile(resolve(_dirname, './fonts/Inter-Medium.woff')),
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: await readFile(resolve(_dirname, './fonts/Inter-Bold.woff')),
        weight: 700,
        style: 'normal',
      },
      {
        name: 'Noto Sans Symbols',
        data: await readFile(resolve(_dirname, './fonts/NotoSansSymbols2-Regular.ttf')),
        weight: 700,
        style: 'normal',
      },
    ],
    props: {
      title: 'hello world',
      desc: 'examples',
      site: 'https://qbb.sh'
    }
  }
  const strSVG = await satoriVue(opt, templateStr)

  const render = await renderAsync(strSVG, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  })
  return await writeFile(_output, render.asPng())
}()).catch((err: Error) => {
  console.error(err)
  process.exit(1)
})
