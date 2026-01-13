import { defineThemeConfig } from 'valaxy-theme-sasho'

/**
 * User Config
 * do not use export const config to avoid defu conflict
 */
export default defineThemeConfig({

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
    {
      text: '主页',
      link: '/',
      icon: 'icon-home',
    },
    {
      text: '动态',
      link: '/dynamic', // Parent item
      icon: 'icon-thumbtack',
    },
    {
      text: '文章',
      link: '/articles', // Parent item
      icon: 'icon-feather',
      items: [
        {
          text: '分类',
          link: '/articles/categories',
          icon: 'icon-archive',
        },
        {
          text: '标签',
          link: '/articles/tags',
          icon: 'icon-tags',
        },
      ],
    },
    {
      text: '留言',
      link: '/guestbook',
      icon: 'icon-thumbtack',
    },
    {
      text: '友联',
      link: '/links',
      icon: 'icon-link',
    },
    {
      text: '关于',
      link: '/about',
      icon: 'icon-about',
      items: [
        {
          text: '本人',
          link: '/about/self',
          icon: 'icon-wangzhanzhu',
        },
        {
          text: '本站',
          link: '/about/site',
          icon: 'icon-wangzhan',
        },
      ],
    },
  ],

  footer: {
    icon: 'icon-sakura',
    powered: true,
    since: {
      year: 2021,
      month: 4,
    },
    beian: {
      enable: false,
      icp: '苏ICP备xxxxxxxx号',
      website: '苏公网安备xxxxxxxx号',
    },
  },
})

