import type { SatoriOptions } from './types'
import satori from 'satori'
import { html } from 'satori-html'

export async function genSatoriSVG(opts: SatoriOptions, renderedHtmlStr: string) {
    return await satori(
        html(renderedHtmlStr),
        opts,
    )
}
