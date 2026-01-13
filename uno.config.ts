import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: [
    'i-ri-home-line',
    'i-ri-book-line',
    'i-ri-code-line',
    'i-ri-menu-line',
    'i-ri-search-line',
    'i-ri-sun-line',
    'i-ri-moon-line',
    'i-ri-rss-line',
    'i-ri-github-line',
    'i-ri-mail-line',
    'i-ri-arrow-down-s-line',
  ],
})
