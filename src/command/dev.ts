import { readFile } from 'fs/promises'
import express from 'express'
import type { ViteDevServer } from 'vite'
import { satoriVue } from '../vue'
import { getPathOpts, log } from './util'

const DYNAMIC_SCRIPTS = `
  <script type="module">
    import { virtual } from 'virtual:file'
    function render(el, text) {
        document.querySelector(el).innerHTML = text
    }

    render('.virtual', virtual)

    if (import.meta.hot) {
        import.meta.hot.on('updated', ({ virtual }) => {
            render('.virtual', virtual)
        })
    }
  </script>
`

const DYNAMIC_STYLES = `
  <style>
    main {
        display: block;
        max-width: 860px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 2.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .virtual{
        width: 100%;
        height: 100%;
        max-width: 860px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .virtual svg {
        width: 100%;
    }
  </style>
`
const BASE_DOM = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSR HTML</title>
    <style>
      * {
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <main>
        <div class="virtual"></div>
    </main>
  </body>
</html>
`

export function startDevServe(tempP: string, cfgP: string, port = 5173) {
    const { tempPath, configPath } = getPathOpts(tempP, cfgP)
    createServer(undefined, undefined, tempPath, configPath).then(({ app }) =>
        app.listen(port, () => {
            log('I', `http://localhost:${port}`)
        }),
    )
}

export async function createServer(root = process.cwd(), hmrPort = 5043, tempPath: string, configPath: string) {
    const app = express()

    const vite: ViteDevServer = await (
        await import('vite')
    ).createServer({
        root,
        logLevel: 'info',
        optimizeDeps: {
            include: [],
        },
        server: {
            middlewareMode: true,
            watch: {
                // During tests we edit the files too fast and sometimes chokidar
                // misses change events, so enforce polling for consistency
                usePolling: true,
                interval: 100,
            },
            hmr: {
                port: hmrPort,
            },
        },
        appType: 'custom',
        plugins: [
            {
                name: 'virtual-file',
                resolveId(id) {
                    if (id === 'virtual:file')
                        return '\0virtual:file'
                },
                async handleHotUpdate({ file, server }) {
                    if (
                        file.endsWith(configPath.split('/').pop() as string)
                     || file.endsWith(tempPath.split('/').pop() as string)
                    ) {
                        log('I', 'updated')
                        const config = await import(`${configPath}??cache=${new Date().getTime()}`)
                        const temp = await readFile(tempPath, 'utf8')
                        const virtual = await satoriVue(Object.assign({}, config, config.default), temp)
                        server.ws.send({
                            type: 'custom',
                            event: 'updated',
                            data: { virtual },
                        })
                    }
                },
                async load(id) {
                    if (id === '\0virtual:file') {
                        const config = await import(configPath)
                        const temp = await readFile(tempPath, 'utf8')
                        const virtual = await satoriVue(Object.assign({}, config, config.default), temp)
                        return `const virtual = '${virtual}';  export { virtual };`
                    }
                },
            },
        ],
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)

    app.use('*', async (req, res, next) => {
        try {
            let [url] = req.originalUrl.split('?')
            if (url.endsWith('/'))
                url += 'index.html'

            if (url.startsWith('/favicon.ico'))
                return res.status(404).end('404')

            if (url.startsWith('/@id/__x00__'))
                return next()

            // const htmlLoc = resolve(`.${url}`)
            // let template = fs.readFileSync(htmlLoc, 'utf-8')
            let template = BASE_DOM

            template = template.replace(
                '</body>',
                `${DYNAMIC_SCRIPTS}${DYNAMIC_STYLES}</body>`,
            )

            // Force calling transformIndexHtml with url === '/', to simulate
            // usage by ecosystem that was recommended in the SSR documentation
            // as `const url = req.originalUrl`
            const html = await vite.transformIndexHtml('/', template)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        }
        catch (e: any) {
            vite && vite.ssrFixStacktrace(e)
            console.log(e.stack)
            res.status(500).end(e.stack)
        }
    })

    return { app, vite }
}
