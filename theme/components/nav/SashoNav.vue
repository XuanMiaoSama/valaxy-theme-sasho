<script lang="ts" setup>
import { useAppStore, useSiteConfig } from 'valaxy'
import { useThemeConfig, isPageLoaded } from '../../composables'
import { computed } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'


const appStore = useAppStore()
const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()

const { y } = useWindowScroll()
const { height } = useWindowSize()
const isScrolled = computed(() => y.value > 0)
const isHidden = computed(() => y.value > height.value)
</script>

<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out hover:bg-white/90 hover:dark:bg-gray-900/90 hover:text-gray-700 hover:dark:text-gray-200 hover:shadow-md group/nav"
    :class="[
      isHidden ? '-translate-y-full opacity-0 pointer-events-none' : '',
      isScrolled
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm text-gray-700 dark:text-gray-200 py-0'
        : 'bg-transparent text-white py-0'
    ]"
  >
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-center h-16">
        <!-- Logo -->
        <RouterLink 
          to="/" 
          class="absolute left-0 flex-shrink-0 flex items-center group opacity-0" 
          :class="{ 'animate-fade-in-left': isPageLoaded }"
          :aria-label="siteConfig.title"
        >
          <img
            v-if="siteConfig.favicon"
            class="w-8 h-8 mr-2 transition-transform group-hover:rotate-12"
            :src="siteConfig.favicon"
            alt="logo"
          />
          <span class="font-bold text-xl tracking-wider font-serif">{{ siteConfig.title }}</span>
        </RouterLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center h-full will-change-[opacity,transform]"
          :class="isScrolled 
            ? 'opacity-100 translate-x-0 transition-[opacity,transform] duration-700 ease-in-out' 
            : 'opacity-0 translate-x-4 pointer-events-none transition-none group-hover/nav:opacity-100 group-hover/nav:translate-x-0 group-hover/nav:pointer-events-auto group-hover/nav:transition-[opacity,transform] group-hover/nav:duration-700 group-hover/nav:ease-in-out'"
        >
          <template v-for="item in themeConfig.nav" :key="item.text">
            <SashoNavItem :item="item" />
          </template>
        </div>

        <!-- Right Side Actions -->
        <div 
          class="absolute right-0 flex items-center space-x-4 opacity-0"
          :class="{ 'animate-fade-in-right': isPageLoaded }"
        >
          <!-- Dark Mode Toggle -->
          <button
            type="button"
            class="p-2 rounded-full transition-colors focus:outline-none hover:text-orange-400"
            aria-label="Toggle Dark Mode"
            @click="appStore.toggleDarkWithTransition"
          >
            <div v-if="!appStore.isDark" i-ri-sun-line class="text-2xl"></div>
            <div v-else i-ri-moon-line class="text-2xl"></div>
          </button>

          <!-- Search Button -->
          <button
            type="button"
            class="p-2 rounded-full transition-colors focus:outline-none hover:text-orange-400"
            aria-label="Search"
          >
            <div i-ri-search-line class="text-2xl"></div>
          </button>
          
          <!-- Mobile Menu Button (Visible on small screens) -->
          <div class="md:hidden">
             <div i-ri-menu-line class="text-2xl"></div>
          </div>
        </div>
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

.animate-fade-in-left {
  animation: fadeInLeft 0.6s ease-out forwards;
}

.animate-fade-in-right {
  animation: fadeInRight 0.6s ease-out forwards;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
