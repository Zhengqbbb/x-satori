import { readFile } from 'node:fs/promises'
import process from 'node:process'
import { createServer as createViteServer } from 'vite'
import type { CliOptions } from '../types'
import { getSatoriConfig, log } from './util'

// #region - HTML Template
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
    body {
        background-color: hsl(0, 0%, 90.0%);
        font-family: "Inter var", "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }
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
    .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}} }
  </style>
`

const BASE_DOM = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dev mode - x satori</title>
    <style>
      * {
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <a href="https://github.com/Zhengqbbb/x-satori"  class="github-corner" aria-label="View source on Github">
        <svg width="80" height="80" fill="#202420" color="#fff" viewBox="0 0 250 250" style="position:absolute;top:0;border:0;right:0" aria-hidden="true">
            <path d="M0 0l115 115h15l12 27 108 108V0z"/>
            <path fill="currentColor" d="M128.3 109c-14.5-9.3-9.3-19.4-9.3-19.4 3-6.9 1.5-11 1.5-11-1.3-6.6 2.9-2.3 2.9-2.3 3.9 4.6 2.1 11 2.1 11-2.6 10.3 5.1 14.6 8.9 15.9" style="transform-origin:130px 106px" class="octo-arm"/>
            <path fill="currentColor" d="M115 115c-.1.1 3.7 1.5 4.8.4l13.9-13.8c3.2-2.4 6.2-3.2 8.5-3-8.4-10.6-14.7-24.2 1.6-40.6 4.7-4.6 10.2-6.8 15.9-7 .6-1.6 3.5-7.4 11.7-10.9 0 0 4.7 2.4 7.4 16.1 4.3 2.4 8.4 5.6 12.1 9.2 3.6 3.6 6.8 7.8 9.2 12.2 13.7 2.6 16.2 7.3 16.2 7.3-3.6 8.2-9.4 11.1-10.9 11.7-.3 5.8-2.4 11.2-7.1 15.9-16.4 16.4-30 10-40.6 1.6.2 2.8-1 6.8-5 10.8L141 136.5c-1.2 1.2.6 5.4.8 5.3z" class="octo-body"/>
        </svg>
    </a>
    <main>
        <div class="virtual"></div>
    </main>
  </body>
</html>
`
// #endregion

function cleanUrl(url: string): string {
    return url.replace(/#.*$/s, '').replace(/\?.*$/s, '')
}

export async function createServer(
    tempPath: string,
    configPath: string,
    argv: CliOptions,
) {
    const satoriSVGParser = tempPath.endsWith('.vue')
        ? (await import('../vue')).default
        : (await import('../astro')).default

    const viteServer = await createViteServer({
        root: process.cwd(),
        server: argv,
        optimizeDeps: {
            include: [],
        },
        logLevel: 'info',
        appType: 'custom',
        plugins: [
            {
                name: 'x-satori',
                resolveId(id) {
                    if (id === 'virtual:file')
                        return '\0virtual:file'
                },

                async load(id) {
                    if (id === '\0virtual:file') {
                        const config = await getSatoriConfig(configPath, argv)
                        const temp = await readFile(tempPath, 'utf8')
                        const virtual = await satoriSVGParser(config, temp)
                        return `const virtual = '${virtual}';  export { virtual };`
                    }
                },

                async handleHotUpdate({ file, server }) {
                    if (
                        file.endsWith(configPath.split('/').pop() as string)
                        || file.endsWith(tempPath.split('/').pop() as string)
                    ) {
                        log('I', 'Hot update detected')
                        const config = await getSatoriConfig(configPath, argv)
                        const temp = await readFile(tempPath, 'utf8')
                        const virtual = await satoriSVGParser(config, temp)
                        server.ws.send({
                            type: 'custom',
                            event: 'updated',
                            data: { virtual },
                        })
                    }
                },

                configureServer(server) {
                    server.watcher.add(tempPath)
                    server.watcher.add(configPath)

                    return () => {
                        server.middlewares.use(async (req, res, next) => {
                            try {
                                const url = req.url && cleanUrl(req.url)
                                if (url?.endsWith('.html') || url === '/') {
                                    res.statusCode = 200
                                    res.setHeader('Content-Type', 'text/html')
                                    res.setHeader('Cache-Control', 'no-cache')
                                    let html = BASE_DOM
                                    html = html.replace(
                                        '</body>',
                                        `${DYNAMIC_SCRIPTS}${DYNAMIC_STYLES}</body>`,
                                    )
                                    html = await server.transformIndexHtml('/', html)
                                    res.end(html)
                                    return
                                }
                                next()
                            }
                            catch (e: any) {
                                server.ssrFixStacktrace(e)
                                console.error(e.stack)
                                res.statusCode = 500
                                res.end(e.stack)
                            }
                        })
                    }
                },
            },
        ],
    })

    return viteServer
}
