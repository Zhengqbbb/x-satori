import type { SatoriOptions as OriginSatoriOptions } from 'satori'

export interface CliOptions {
    dev: boolean
    help: boolean
    version: boolean
    template: string
    config: string
    output: string
}

export type SatoriOptions = OriginSatoriOptions & {
    /**
   * component props
   */
    props?: Record<string, any>
}
