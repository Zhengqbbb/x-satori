import { genVueSatoriSVG, UserConfig } from 'x-satori/vue'
import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'pathe'

(async function () {
  const _dirname = typeof __dirname !== 'undefined'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url))
  const _output = resolve(_dirname, './image/og.svg')

  const templateStr = await readFile(resolve(_dirname, './Template.vue'), 'utf8')
  const opt: UserConfig = {
    height: 628,
    width: 1200,
    fonts: [
      {
        name: 'Inter',
        data: await readFile(resolve(_dirname, './font/Inter-Medium.woff')),
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: await readFile(resolve(_dirname, './font/Inter-Bold.woff')),
        weight: 700,
        style: 'normal',
      },
      {
        name: 'Noto Sans Symbols',
        data: await readFile(resolve(_dirname, './font/NotoSansSymbols2-Regular.ttf')),
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
  const strSVG = await genVueSatoriSVG(opt, templateStr)

  await writeFile(_output, strSVG)
}()).catch((err: Error) => {
  console.error(err)
  process.exit(1)
})
