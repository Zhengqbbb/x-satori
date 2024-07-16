import type { SatoriOptions as OriginSatoriOptions } from 'satori'

export interface CliOptions {
    help: boolean
    version: boolean
    template: string
    config: string
    output: string
    props: string
    dev: boolean
    host: boolean
    port: number
}

export type SatoriOptions = OriginSatoriOptions & {
    /**
     * component props
     */
    props?: Record<string, any>
}
