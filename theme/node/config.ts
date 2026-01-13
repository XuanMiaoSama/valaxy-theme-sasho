import type { ThemeConfig, UserThemeConfig } from '../types'

/**
 * Default Config
 */
export const defaultThemeConfig: ThemeConfig = {
  valaxyDarkOptions: {
    circleTransition: true,
  },

  colors: {
    primary: '#0078E7',
  },

  CDN: 'https://gcore.jsdelivr.net/gh/XuanMiaoSama/CDN@1.1',
  avatar: '/img/custom/profile.jpg',
  backgroundPicture: ['https://pic.imgdb.cn/item/62b1ea7b09475431291dec4b.png'],

  pageHeaderImages: {
    archive: 'https://pic.imgdb.cn/item/62b1ea7b09475431291dec4b.png',
    dynamic: 'https://pic.imgdb.cn/item/62b1ea7b09475431291dec4b.png',
    guestbook: 'https://pic.imgdb.cn/item/62b1ea7b09475431291dec4b.png',
    links: 'https://pic.imgdb.cn/item/62b1ea7b09475431291dec4b.png',
    about: 'https://pic.imgdb.cn/item/62b1ea7b09475431291dec4b.png',
  },

  sidebar: 'left',
  // colors: {
  //   primary: 'red',
  // },

  nav: [
  ],

  footer: {
    icon: 'icon-sakura',
    powered: true,
    since: {
      year: 2022,
      month: 4,
    },
    beian: {
      enable: false,
      icp: '苏ICP备xxxxxxxx号',
      website: '苏公网安备xxxxxxxx号',
    },
  },
}

export function defineThemeConfig(config: UserThemeConfig) {
  return config
}
