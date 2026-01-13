import type { DefaultTheme } from 'valaxy'
import 'jinrishici'

export namespace SashoTheme {
  export type Config = ThemeConfig
  export type Sidebar = any
}

/**
 * Theme Config
 */
export interface ThemeConfig extends DefaultTheme.Config {
  avatar: string
  backgroundPicture: string | string[]

  /**
   * Page Header Images
   * Configure header images for specific pages
   */
  pageHeaderImages?: {
    [key: string]: string
    archive?: string
    dynamic?: string
    guestbook?: string
    links?: string
    about?: string
  }

  CDN: string
  sidebar: string
  colors: {
    /**
     * primary color
     * @default '#0078E7'
     */
    primary: string
  }

  /**
   * footer
   */
  footer: Partial<{
    /**
     * 建站于
     */
    since: {
      year: number
      month: number
    }

    /**
     * Icon between year and copyright info.
     */
    icon: string

    /**
     * Powered by valaxy & valaxy-theme-${name}, default is yun
     */
    powered: boolean

    /**
     * Chinese Users | 中国用户
     * 备案 ICP
     * 国内用户需要在网站页脚展示备案 ICP 号
     * https://beian.miit.gov.cn/
     */
    beian: {
      enable: boolean
      /**
       * 苏ICP备xxxxxxxx号
       */
      icp: string
      website: string
    }
  }>

  /**
   * navbar
   */
  nav: NavItem[]
}

export type UserThemeConfig = Partial<ThemeConfig>

export interface NavItem {
  text: string
  link: string
  icon?: string
  items?: NavItem[]
}

export type ThemeUserConfig = Partial<ThemeConfig>

/**
 * 提供 defineThemeConfig 以便用户端类型正确推断
 */
export declare function defineThemeConfig(config: UserThemeConfig): UserThemeConfig
