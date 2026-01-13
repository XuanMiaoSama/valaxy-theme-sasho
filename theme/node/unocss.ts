import type { ResolvedValaxyOptions } from 'valaxy'
import type { ThemeConfig } from '../types'

/**
 * generateSafelist by config
 * @param options
 */
export function generateSafelist(options: ResolvedValaxyOptions<ThemeConfig>) {
  const themeConfig = options?.config.themeConfig || {}
  const safelist: string[] = [
    'c-rose-3',
  ]

  const footerIcon = themeConfig.footer?.icon
  if (footerIcon)
    safelist.push(footerIcon)

  return safelist
}
