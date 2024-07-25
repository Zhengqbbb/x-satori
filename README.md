<h1 align="center">x-satori</h1>

<p align="center">
    <a href="https://www.npmjs.com/package/x-satori">
        <img alt="version" src="https://img.shields.io/npm/v/x-satori?color=212121&label=">
    </a><br><br>
    Use <b>Vue and Astro file to generate SVG image</b> by <a href="https://github.com/vercel/satori">Satori</a>.<br>
    The image can be generated by running ESM script or CLI.
</p>
<br>
<table>
    <tr>
        <td align="center" width="50%">
        <br>
            <p><b><a href="#-vue">Vue</a></b></p>
            <a href="https://stackblitz.com/edit/x-satori?file=package.json">
                <img alt="Open in StackBlitz" src="https://developer.stackblitz.com/img/open_in_stackblitz.svg">
            </a>
        </td>
        <td align="center" width="50%">
        <br>
            <p><b><a href="#-astro">Astro</a></b></p>
            <a href="https://stackblitz.com/edit/x-satori-astro?file=package.json">
                <img alt="Open in StackBlitz" src="https://developer.stackblitz.com/img/open_in_stackblitz.svg">
            </a>
        </td>
    </tr>
    <tr>
        <td align="center" width="50%">
            <a href="https://youtu.be/8HkJg1a_Zew">
                <img alt="youtube guide demo" src="./demo-vue.gif">
            </a>
            <br>
            <br>
            <a href="https://x.com/zhengqbbb/status/1637849646075908096">
                <img alt="View on Twitter post" src="https://cdn.jsdelivr.net/gh/Zhengqbbb/Zhengqbbb@v1.1.1/icons/view-twitter-post.svg">
            </a>
        </td>
        <td align="center" width="50%">
            <a href="https://youtu.be/8HkJg1a_Zew">
                <img alt="youtube guide demo" src="./demo-astro.gif">
            </a>
            <br>
            <br>
            <a href="https://x.com/zhengqbbb/status/1637849646075908096">
                <img alt="View on Twitter post" src="https://cdn.jsdelivr.net/gh/Zhengqbbb/Zhengqbbb@v1.1.1/icons/view-twitter-post.svg">
            </a>
        </td>
    </tr>
</table>

---

> Local running example demo

```sh
npx degit Zhengqbbb/x-satori/playground/vue   <file_name>     # Vue
npx degit Zhengqbbb/x-satori/playground/astro <file_name>     # Astro

cd <file_name>
pnpm install

# Development Model
pnpm dev:og

# [Generate] SVG
pnpm gen:svg

# [Generate] PNG
pnpm gen:png
```

## Usage

```sh
npm install -D x-satori
```

### ⭐ Vue

<details>
<summary>Using Vitepress <a href="https://vitepress.dev/reference/site-config#buildend">buildEnd hook</a></summary><br>

- **Example**: [examples/vue-vitepress](./examples/vue-vitepress/) ⭐⭐⭐

</details>


<details>
<summary>Using CLI</summary><br>

**Example**: [playground/vue](./playground/vue/)

- Dependency: **Vue | Vite**

```sh
$ npx x-satori --help

SYNOPSIS:
    x-satori --template <template_file_path> --config <satori_config_path> [--props <JSON>]
    x-satori --template <template_file_path> --config <satori_config_path> [--props <JSON>] --output <svg_path>
    x-satori --template <template_file_path> --config <satori_config_path> [--props <JSON>] --dev [--host --port <num>]

OPTIONS:
    -d|--dev                   Turn on Dev mode
       --host                  Expose  host in Dev mode
       --port     <num>        Specify port in Dev mode
    -t|--template <path>       The Vue or Astro template file path
    -c|--config   <path>       The export satori configure file path
    -o|--output   <path>       Target output SVG path
    --props       <JSON_str>   Overwrite and use props in config

EXAMPLES:
    x-satori --config "./satori.ts" --template "./Template.vue" --dev --host
    x-satori --config "./satori.ts" --template "./Template.vue"
    x-satori --config "./satori.js" --template "./Template.vue" --props '{"title": "Hello World"}'
    x-satori --config "./satori.js" --template "./Template.vue" -o image.svg
```

#### Configure

- Extends Satori options and add Vue file props option

```mjs
import { defineSatoriConfig } from 'x-satori/vue'

export default defineSatoriConfig({
    // ... Satori options
    props: {
        // ...Vue SFC props options
        // title: "Hello world"
    },
})
```

#### Vue template file

- **Only the template syntax is used**, and props are only used for hint completion
- [→ Satori supports common CSS features](https://github.com/vercel/satori#css)
- [→ Tailwindcss documentation](https://tailwindcss.com/docs/customizing-colors)

```html
<script setup lang="ts">
const props = defineProps({
  title: String,
})
</script>
<template>
  <div class="w-full h-full flex text-white bg-blue-500 items-center justify-center">
    <h1 :style="{ fontSize: '70px' }">
      {{ title }} 👋
    </h1>
  </div>
</template>
```

</details>

<details>
<summary>Using ESM script</summary><br>

- Dependency: **Vue**

```mjs
import { defineSatoriConfig, satoriVue } from 'x-satori/vue'

function main() {
    const _DIRNAME = typeof __dirname !== 'undefined'
        ? __dirname
        : dirname(fileURLToPath(import.meta.url))
    const _OUTPUT = resolve(_DIRNAME, './image/og.png')

    const templateStr = await readFile(resolve(_DIRNAME, './Template.vue'), 'utf8')
    const opt = defineSatoriConfig({
    // ... Satori options
        props: {
        // ...Vue SFC props options
        // title: "Hello world"
        },
    })
    const strSVG = await satoriVue(opt, templateStr)
    console.log(strSVG)
}
main()
```

- **Example**: [examples/vue-run-esm-script](./examples/vue-run-esm-script/)

    ```sh
    npm run gen:svg
    npm run gen:png
    ```

</details>

### ⭐ Astro

<details>
    <summary>Using Astro <a href="https://docs.astro.build/en/guides/endpoints/">file-endpoints</a></summary><br>

- **Example**: [examples/astro-file-endpoint](./examples/astro-file-endpoint/) ⭐⭐⭐
- **Example**: [Repo - Zhengqbbb/qbb.sh](https://github.com/Zhengqbbb/qbb.sh/blob/astro/src/pages/og/%5Bslug%5D.png.ts)



---

#### 1. Install Dependencies

```sh
npm install -D x-satori @resvg/resvg-js # Convert SVG to PNG
```

#### 2. Create Astro [file-endpoints](https://docs.astro.build/en/guides/endpoints/)

> If target is generate `dist/og/*.png`.<br>
> So that touch a file `src/pages/og/[slug].png.ts`

```ts
import { readFile } from 'node:fs/promises'
import { type SatoriOptions, satoriAstro } from 'x-satori/astro'
import { Resvg } from '@resvg/resvg-js'
import type { APIRoute } from 'astro'
import { type CollectionEntry, getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');

    return posts
        .map(post => ({
            params: { slug: post.slug },
            props: { ...post },
        }));
}

async function getPostImageBuffer(props) {
        const template = await readFile(/** .astro template file */, 'utf-8')
        const config: SatoriOptions = {
            //... satori options,
            props: {
                //...astro template file props
                ...props.data,
            }
        }
        const svg = await satoriAstro(config, template)
        const resvg = new Resvg(svg)
        const pngData = resvg.render()
        return pngData.asPng()
}

export const GET: APIRoute = async ({ props }) =>
    new Response(
        await getPostImageBuffer(props as CollectionEntry<'blog'>),
        {
            headers: { 'Content-Type': 'image/png' },
        },
    )
```

</details>

<details>
<summary>Using ESM script</summary><br>

- Dependency: **Astro**

```mjs
import { defineSatoriConfig, satoriAstro } from 'x-satori/astro'

function main() {
    const _DIRNAME = typeof __dirname !== 'undefined'
        ? __dirname
        : dirname(fileURLToPath(import.meta.url))
    const _OUTPUT = resolve(_DIRNAME, './image/og.png')

    const templateStr = await readFile(resolve(_DIRNAME, './Template.vue'), 'utf8')
    const opt = defineSatoriConfig({
    // ... Satori options
        props: {
        // ...Vue SFC props options
        // title: "Hello world"
        },
    })
    const strSVG = await satoriAstro(opt, templateStr)
    console.log(strSVG)
}
main()
```

- **Example**: [examples/astro-run-esm-script](./examples/astro-run-esm-script/) ⭐⭐⭐

    ```sh
    npm run gen:svg
    npm run gen:png
    ```

- **Example**: [Repo - Zhengqbbb/qbb.sh@v2.1.1/.x-cmd/og/main.ts](https://github.com/Zhengqbbb/qbb.sh/blob/v2.1.1/.x-cmd/og/main.ts)

</details>

<details>
<summary>Using CLI</summary><br>

- Dependency: **Astro** | **Vite** (for dev mode)

```sh
$ npx x-satori --help

SYNOPSIS:
    x-satori --template <template_file_path> --config <satori_config_path> [--props <JSON>]
    x-satori --template <template_file_path> --config <satori_config_path> [--props <JSON>] --output <svg_path>
    x-satori --template <template_file_path> --config <satori_config_path> [--props <JSON>] --dev [--host --port <num>]

OPTIONS:
    -d|--dev                   Turn on Dev mode
       --host                  Expose  host in Dev mode
       --port     <num>        Specify port in Dev mode
    -t|--template <path>       The Vue or Astro template file path
    -c|--config   <path>       The export satori configure file path
    -o|--output   <path>       Target output SVG path
    --props       <JSON_str>   Overwrite and use props in config

EXAMPLES:
    x-satori --config "./satori.ts" --template "./Template.astro" --dev --host
    x-satori --config "./satori.ts" --template "./Template.astro"
    x-satori --config "./satori.js" --template "./Template.astro" --props '{"title": "Hello World"}'
    x-satori --config "./satori.js" --template "./Template.astro" -o image.svg
```

#### Configure

- Extends Satori options and add Vue file props option

```mjs
import { defineSatoriConfig } from 'x-satori/astro'

export default defineSatoriConfig({
    // ... Satori options
    props: {
        // ...astro file props options
        // title: "Hello world"
    },
})
```

#### Astro template file

- **Only the template syntax is used**, and props are only used for hint completion
- [→ Satori supports common CSS features](https://github.com/vercel/satori#css)
- [→ Tailwindcss documentation](https://tailwindcss.com/docs/customizing-colors)

```astro
---
interface Props {
    title: string
};

const { title = Hello world } = Astro.props;
---
<div class="w-full h-full text-1.4rem text-white flex flex-col items-center justify-between">
    <h2 >
        {title}
    </h2>
</div>

```

- **Example**: [playground/astro](./playground/astro/) ⭐⭐⭐
- **Example (Advanced)** - Using `Shell Scripts` to batch image generation with `resvg-cli`:<br>
    [Repo - Zhengqbbb/qbb.sh/.x-cmd/og](https://github.com/Zhengqbbb/qbb.sh/blob/6fe03b051c1468417682da6e329be0e0b77c6468/.x-cmd/og#L37-L45)

</details>

### 🎼 Command-line Advanced Usage

<details>
    <summary>pipeline generate <b>png</b> with <code>resvg-cli</code></summary><br>

> TIP: You can install it globally or use `bunx` for replacement startup

```sh
npx x-satori --config "./satori.ts" --template "./Template.vue" --props '{"title": "Hello World"}' | \
    npx resvg-cli - image.png
```

</details>

<details>
    <summary>pipeline generate <b>webp</b> or more edit with <code>resvg-cli</code> and <code>imagemagick</code> </summary><br>

> TIP: You can install it globally or use `bunx` for replacement startup

```sh
npx x-satori --config "./satori.ts" --template "./Template.vue" --props '{"title": "Hello World"}' | \
    npx resvg-cli - | \
    magick - webp:image.webp
```

</details>

## How it works
1. ▲ [Satori](https://github.com/vercel/satori) is an amazing library for generating SVG strings from pure HTML and CSS.
2. Unfortunately, it is built on top of React's JSX and expects ["React-elements-like objects"](https://github.com/vercel/satori#use-without-jsx).
3. Thanks an library [natemoo-re/satori-html](https://github.com/natemoo-re/satori-html) can to generate the necessary VDOM object from a string of HTML.
4. So the key is to **convert the Vue SFC file to an HTML string**, and here I used transform so that I could generate it via script (Only the template syntax is used)
    - `@vue/compiler-sfc`: to parse Vue SFC file
    - `vue - createSSRApp`  and `vue/server-renderer`: transform HTML string
5. Astro: a similar method:
    - `@astrojs/compiler`: to transform `.astro` to `ts`
    - `AstroContainer`: renderToString to obtain HTML string

## Why developed

> My Weekend Pilot Project

1. This processing logic, **initially used in my Vite-SSG person website** [qbb.sh](https://github.com/Zhengqbbb/qbb.sh/blob/790c47026cb1baac34dee8642150ec1729fb0f39/package.json#L18), I prefer to run the script to generate e.g `tsx gen-og.mts` at my building time rather than the edge Fn
2. And personally, I think Vue SFC File would be better in expressing this SVG structure, but I only use the template syntax and props, and the css would use tailwindcss.
3. I did a experiment this weekend, using Vite HRM to improve DX, and developed a CLI so that I could run command and generated the SVG directly.

I'm happy that I finally finished this series of experiments and results this weekend. <br>

<table>
  <tr>
    <td align="center" width="50%">
        <img alt="demo-img-1"src="https://user-images.githubusercontent.com/40693636/226387222-e2de688d-bbb6-41a2-9454-d10d8fd7784d.png">
    </td>
    <td align="center" width="50%">
        <img alt="demo-img-2"src="https://cdn.jsdelivr.net/gh/Zhengqbbb/qbb.sh@v2.1.1/public/og/posts.png">
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
        <img alt="demo-img-3"src="https://user-images.githubusercontent.com/40693636/226387925-57b58c6a-6677-44d4-a7a0-6939193704b3.png">
    </td>
    <td align="center" width="50%">
        <img alt="demo-img-4"src="https://cdn.jsdelivr.net/gh/Zhengqbbb/qbb.sh@v2.1.1/public/og/2022-12-17-new-homepage.png">
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
        <b>Vue</b>
        <br>
        Vitepress buildEnd example:
        <br>
        <a href="./examples/vue-vitepress/">examples/vue-vitepress/</a>
        <br>
        ESM script code example:
        <br>
        <a href="https://github.com/Zhengqbbb/qbb.sh/tree/vitesse/build/node/og/main.mts">qbb.sh@vitesse/node/og/main.mts</a>
    </td>
    <td align="center" width="50%">
        <b>Astro</b>
        <br>
        File endpoints example:
        <br>
        <a href="https://satori-astro.vercel.app/blog/">https://satori-astro.vercel.app</a>
        <br>
        ESM script code example:
        <br>
        <a href="https://github.com/Zhengqbbb/qbb.sh/blob/v2.1.1/.x-cmd/og/main.ts">qbb.sh@astro/.x-cmd/og/main.ts</a>
    </td>
  </tr>
</table>

## Related Links

- [nuxt-modules/og-image](https://github.com/nuxt-modules/og-image) - Nuxt or want to use edge Fn
- [Vercel / Open Graph (OG) Image Generation](https://vercel.com/docs/functions/og-image-generation)

## FAQ

<details>
<summary>CJS support ?</summary><br>

**Not supported**, waiting for upstream library [natemoo-re/ultrahtml](https://github.com/natemoo-re/ultrahtml/tree/main)

</details>

## Contributing

> I did it step by step according to the documentation of Astro, Vue and Vite, if you are interested, PR welcome 🤗

```sh
pnpm install
pnpm dev        # dev mode
pnpm x --help   # start up the CLI and development
```

## LICENSE

MIT
Copyright (c) 2023-2024 [Q.Ben Zheng](https://github.com/Zhengqbbb)

<p align="center">
    <table>
        <tbody>
        <td align="center">
            <br>
            I just try my best to make thing well.<br>
            Could you give a star ⭐ to encourage me 🤗
            <br>
            If possible, can to be my <a href="https://github.com/sponsors/Zhengqbbb">💖 Sponsor 💖</a> to support my work
            <img width="800" height="0" />
        </td>
        </tbody>
    </table>
</p>
