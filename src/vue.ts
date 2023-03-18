import { parse } from '@vue/compiler-sfc'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { genSatoriSVG, initEnv } from './core'
import type { SatoriOptions } from './types'

export { type SatoriOptions }

export async function satoriVue(opts: SatoriOptions, vueTemplateStr: string) {
    await initEnv()

    const { descriptor } = parse(vueTemplateStr)
    const renderedHtmlStr = await renderToString(
        createSSRApp(
            {
                props: transformProps(opts.props),
                template: descriptor.template?.content ?? '',
            },
            opts.props,
        ),
    )

    return await genSatoriSVG(opts, renderedHtmlStr)
}

function transformProps(props?: Record<string, any>): Record<string, { type: any }> {
    const result: Record<string, { type: any }> = {}
    if (!props)
        return result
    for (const key in props) {
        let type
        if (typeof props[key] === 'boolean')
            type = Boolean
        else if (typeof props[key] === 'number')
            type = Number
        else if (typeof props[key] === 'string')
            type = String
        else if (typeof props[key] === 'symbol')
            type = Symbol
        else
            type = Object

        result[key] = { type }
    }
    return result
}
