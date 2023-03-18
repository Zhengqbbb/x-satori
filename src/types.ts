import type { SatoriOptions as OriginSatoriOptions } from 'satori'

export type SatoriOptions = OriginSatoriOptions & {
    /**
   * component props
   */
    props?: Record<string, any>
}
