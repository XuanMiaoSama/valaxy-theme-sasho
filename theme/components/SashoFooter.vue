<script setup lang="ts">
// import { useSiteConfig } from 'valaxy'
import { useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()
// const siteConfig = useSiteConfig()
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1
const currentTime = `${currentYear}.${currentMonth}`
const { year, month } = themeConfig.value.footer?.since ?? { year: currentYear, month: currentMonth }
const since = `${year}.${month}`
const powered = themeConfig.value.footer?.powered ?? true
const icon = themeConfig.value.footer?.icon ?? 'icon-sakura'
</script>

<template>
  <footer text="center neutral">
    <div class="block text-size-sm font-600 line-height-normal">
      <span>
        &copy;
        {{ since }}
        <span> - </span>
        {{ currentTime }}
      </span>
    </div>
    <div class="block text-size-sm font-600 line-height-normal">
      <span v-if="powered">
        Theme by.<a class="font-600 decoration-underline decoration-dotted" href="https://github.com/XuanMiaoSama/valaxy-theme-Sasho">Sasho </a>
        <span
          v-if="icon"
          :class="[icon, icon.startsWith('icon-') ? 'iconfont' : '']"
          class="rotate inline-block text-size-18px c-rose-3"
        />
        Powered by <a class="font-600 decoration-underline decoration-dotted" href="https://valaxy.site/">Valaxy</a></span>
    </div>
    <div v-if="themeConfig.footer.beian?.enable" class="text-size-sm">
      <a v-if="themeConfig.footer.beian.website" href="https://beian.mps.gov.cn/#/query/webSearch">
        <img src="../public/img/policeBadge.png" alt="网警警徽" class="inline h-5">
        {{ themeConfig.footer.beian.website }}
      </a>
      <span v-if="themeConfig.footer.beian.icp && themeConfig.footer.beian.website"> | </span>
      <a v-if="themeConfig.footer.beian.icp" href="https://beian.miit.gov.cn/#/Integrated/recordQuery">
        {{ themeConfig.footer.beian.icp }}
      </a>
    </div>
  </footer>
</template>
