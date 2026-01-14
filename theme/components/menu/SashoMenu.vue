<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'
import { useThemeConfig } from '../../composables'

const themeConfig = useThemeConfig()
const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 0)
</script>

<template>
  <div
    class="will-change-[opacity,transform] hidden h-full items-center md:flex"
    :class="isScrolled
      ? 'opacity-100 translate-x-0 transition-[opacity,transform] duration-700 ease-in-out'
      : 'opacity-0 translate-x-4 pointer-events-none transition-none group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:pointer-events-auto group-hover/nav:transition-[opacity,transform] group-hover/nav:duration-700 group-hover/nav:ease-in-out'"
  >
    <template v-for="item in themeConfig.nav" :key="item.text">
      <div
        class="group relative h-full flex items-center"
      >
        <SashoMenuItem :item="item" />

        <!-- Dropdown -->
        <SashoMenuDrop v-if="item.items">
          <template v-for="subItem in item.items" :key="subItem.link">
            <SashoMenuDropItem :item="subItem" />
          </template>
        </SashoMenuDrop>
      </div>
    </template>
  </div>
</template>
