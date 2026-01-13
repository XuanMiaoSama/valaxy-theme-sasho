<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useSiteConfig } from 'valaxy'
import { useThemeConfig } from 'valaxy'
import type { ThemeConfig } from '../types'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { isPageLoaded } from '../composables'

const props = withDefaults(defineProps<{
  isHome?: boolean
  title?: string
  image?: string
}>(), {
  isHome: true
})

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig<ThemeConfig>()

const { y } = useWindowScroll()
const { height } = useWindowSize()

// Calculate scale and opacity based on scroll position
const avatarStyle = computed(() => {
  const scrollY = y.value
  const winH = height.value
  
  // Calculate progress: 0 at top, 1 when scrolled one full screen height
  const progress = Math.min(scrollY / winH, 1)
  
  // Scale down to 0.5 at full scroll
  const scale = 1 - (progress * 0.5)
  // Opacity fades to 0 faster, say by 80% scroll
  const opacity = Math.max(0, 1 - (progress * 1.2))

  return {
    transform: `scale(${scale})`,
    opacity: opacity,
    // Ensure it stays centered or behaves as expected during transform
    transformOrigin: 'center center'
  }
})

const imageList = computed(() => {
  if (props.image) {
    return [props.image]
  }
  const bg = themeConfig.value.backgroundPicture
  if (Array.isArray(bg)) {
    return bg
  }
  if (bg) {
    return [bg]
  }
  return ['https://pic.imgdb.cn/item/62b1ea7b09475431291dec4b.png']
})

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const avatarUrl = computed(() => {
  const avatar = themeConfig.value.avatar
  const cdn = themeConfig.value.CDN
  if (cdn && avatar && !avatar.startsWith('http')) {
    return cdn + avatar
  }
  return avatar
})

function startCarousel() {
  if (imageList.value.length > 1) {
    timer = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % imageList.value.length
    }, 5000)
  }
}

onMounted(() => {
  startCarousel()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function scrollToContent() {
  const content = document.querySelector('#content-start')
  if (content) {
    content.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div 
    class="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    style="transform: translateY(-40px);"
    :class="{ 'animate-curtain-drop': isPageLoaded }"
  >
    <!-- Banner Background -->
    <div class="fixed inset-0 z-0">
      <div 
        v-for="(img, index) in imageList" 
        :key="img"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="index === currentIndex ? 'opacity-100' : 'opacity-0'"
      >
        <img 
          :src="img" 
          alt="Banner" 
          class="w-full object-cover"
        />
      </div>
    </div>

    <!-- Banner Content -->
    <div class="z-10 text-center text-white px-4 animate-fade-in-up flex flex-col items-center">
      <!-- Wrapper for scroll animation -->
      <div v-if="avatarUrl" :style="avatarStyle" class="will-change-transform">
        <div
          class="w-24 h-24 md:w-32 md:h-32 mb-4 rounded-full overflow-hidden shadow-lg border-4 border-white/30 transition-transform duration-700 ease-out hover:rotate-[360deg]"
        >
          <img :src="avatarUrl" alt="Avatar" class="w-full h-full object-cover" />
        </div>
      </div>

      <div
        v-if="siteConfig.description"
        class="mt-4 px-24 py-4 bg-black/50 backdrop-blur-sm rounded-xl text-white text-lg font-bold shadow-md transition-colors hover:bg-black/60 select-none cursor-default"
      >
        {{ siteConfig.description }}
      </div>
    </div>

    <!-- Scroll Down Arrow -->
    <div 
      class="absolute bottom-20 z-20 cursor-pointer animate-bounce hover:opacity-75 transition-opacity duration-300"
      @click="scrollToContent"
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 9L12 17L20 9" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <!-- Waves -->
    <div class="absolute bottom-0 left-0 right-0 w-full z-10 text-gray-50 dark:text-gray-900">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="currentColor" opacity="0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="currentColor" opacity="0.5" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="currentColor" opacity="0.3" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="currentColor" opacity="1" />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
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

.waves {
  width: 100%;
  height: 10vh;
  min-height: 80px;
  max-height: 150px;
}

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
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
