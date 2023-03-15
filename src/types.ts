import type { SatoriOptions } from 'satori'

export type UserConfig = SatoriOptions & {
  /**
   * component props
   */
  props?: Record<string, any>
}
