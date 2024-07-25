# x-satori - Vitepress `buildEnd` hook example 


This example demonstrates how to use the Vitepress [buildEnd hook](https://vitepress.dev/reference/site-config#buildend) to generate **Open Graph image**.

![demo](./public/og/index.png)

## Running example to local

```bash
npx degit Zhengqbbb/x-satori/examples/vue-vitepress <file_name>

cd <file_name>
npm install

# Development Image Template Model
npm run dev:og

# Development Website
npm run dev
# Build Website
npm run build
# Preview Website
npm run preview
```

## Get-Started

### 1. Install Dependencies

```bash
npm install -D x-satori @resvg/resvg-js
```

- [x-satori](https://github.com/Zhengqbbb/x-satori) - Using Astro file (.astro) as template to generate image SVG.
- [@resvg/resvg-js](https://www.npmjs.com/package/@resvg/resvg-js) - Convert SVG to PNG.

### 2. Create build utils folder and files

[.vitepress/og/](./.vitepress/og/)

```sh
.
├── config.ts       # x-satori Configuration file - Provide for index.ts and x-satori dev CLI
├── index.ts        # Provide for .vitepress/config.ts
└── Template.vue    # Vue file template - Provide for index.ts and x-satori dev CLI
```

> [!TIP]
> Can using `x-satori` CLI to create dev server to preview and design the vue template
> ```sh
> npm run dev:og
> ```

### 3. `config.mts` add `buildEnd` hook

```ts
import { defineConfig } from 'vitepress'
import { generateOGImage } from './og'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // ...
  buildEnd: async (config) => {
    await generateOGImage(config)
  },
  // ...
})
```

### 4. 🤗 That it ! Have enjoy - Run `npm run build`

Check it `.vitepress/dist/og`

