<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 0)
</script>

<template>
  <nav
    class="group/nav fixed left-0 top-0 z-50 w-full py-0 transition-all duration-300"
    dark:hover="bg-gray-900/90 text-gray-200"
    hover="bg-white/90 text-gray-700 shadow-md"
    :class="[
      isScrolled
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm text-gray-700 dark:text-gray-200'
        : 'bg-transparent text-white',
    ]"
  >
    <div class="w-full px-4 lg:px-8 sm:px-6">
      <div class="relative h-16 flex items-center justify-center">
        <!-- Logo -->
        <SashoBlogTitle />

        <!-- Desktop Menu -->
        <SashoMenu />

        <!-- Right Side Actions -->
        <SashoNavOperate />
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Ensure text shadow on transparent background for readability */
nav:not(.bg-white\/80):not(:hover) {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* Reset text shadow when scrolled or hovered */
nav.bg-white\/80,
nav:hover {
  text-shadow: none;
}
</style>
