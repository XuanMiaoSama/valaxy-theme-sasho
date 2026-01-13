import type { UserThemeConfig } from 'valaxy-theme-Sasho'
import { defineValaxyConfig } from 'valaxy'

/**
 * User Config
 * do not use export const config to avoid defu conflict
 */
export default defineValaxyConfig<UserThemeConfig>({
  theme: 'Sasho',
})
