<script lang="ts" setup>
import { computed } from 'vue'
import { useThemeConfig } from 'valaxy'
import type { ThemeConfig } from '../types'
import { useRoute } from 'vue-router'
import { isPageLoaded } from '../composables'

const props = defineProps<{
  title?: string
  image?: string
  icon?: string
  color?: string
}>()

const themeConfig = useThemeConfig<ThemeConfig>()
const route = useRoute()

const backgroundImage = computed(() => {
  // 1. Frontmatter prop override
  if (props.image) return props.image

  // 2. Configured page image
  const pageImages = themeConfig.value.pageHeaderImages || {}
  const path = route.path
  
  // Simple mapping based on route path
  if (path.startsWith('/archives') || path.startsWith('/articles')) return pageImages.archive
  if (path.startsWith('/dynamic')) return pageImages.dynamic
  if (path.startsWith('/guestbook')) return pageImages.guestbook
  if (path.startsWith('/links')) return pageImages.links
  if (path.startsWith('/about')) return pageImages.about

  // 3. Default fallback
  const bg = themeConfig.value.backgroundPicture
  if (Array.isArray(bg)) return bg[0]
  return bg || 'https://pic.imgdb.cn/item/62b1ea7b09475431291dec4b.png'
})
</script>

<template>
  <div 
    class="relative w-full h-[400px] flex flex-col items-center justify-center overflow-hidden"
    style="transform: translateY(-40px);"
    :class="{ 'animate-curtain-drop': isPageLoaded }"
  >
    <!-- Background -->
    <div class="absolute inset-0 z-0">
      <img 
        :src="backgroundImage" 
        class="w-full h-full object-cover brightness-75 transition-transform duration-500 hover:scale-105"
        alt="Header Background"
      />
    </div>

    <!-- Content -->
    <div class="z-10 text-center text-white px-4 animate-fade-in-up">
      <div v-if="icon" class="mb-4 text-6xl">
        <div :class="icon" />
      </div>
      <h1 class="text-4xl md:text-5xl font-bold drop-shadow-lg tracking-wide">
        {{ title }}
      </h1>
    </div>

    <!-- Curved Bottom Edge -->
    <div class="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
      <svg class="relative block w-full h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,120 Q600,0 1200,120 L1200,120 L0,120 Z" fill="currentColor" class="text-white dark:text-gray-900"></path>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-curtain-drop {
  animation: curtainDrop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes curtainDrop {
  from {
    transform: translateY(-40px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
