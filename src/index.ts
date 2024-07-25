import type { SatoriOptions } from './types'

export type { SatoriOptions }
export * from './core'
export function defineSatoriConfig(opts: SatoriOptions) {
    return opts
}
