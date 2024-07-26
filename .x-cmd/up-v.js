import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { readdir, writeFile } from 'node:fs/promises'

const _dirname = typeof __dirname !== 'undefined'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url))
const _require = createRequire(_dirname)

async function getDirectories(dir) {
    const source = resolve(_dirname, dir)
    const entries = await readdir(source, { withFileTypes: true })
    const directories = entries
        .filter(entry => entry.isDirectory())
        .map(entry => join(source, entry.name))
    return directories
}

;(async () => {
    const { version: target } = _require('./package.json')
    const packages = [
        ...await getDirectories('../examples'),
        ...await getDirectories('../playground'),
    ].map(p => join(p, 'package.json'))

    await Promise.all(
        packages.map(async (path) => {
            const pkg = _require(path)
            pkg.devDependencies['x-satori'] = `^${target}`
            await writeFile(
                path,
                `${JSON.stringify(pkg, null, 2)}\n`,
                'utf-8',
            )
        }),
    )
})().catch((err) => {
    console.error(err)
})
