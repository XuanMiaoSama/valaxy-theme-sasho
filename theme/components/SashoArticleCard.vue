<script lang="ts" setup>
import type { Post } from 'valaxy'
import { computed, ref } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const props = defineProps<{
  post: Post
  index: number
}>()

const cardRef = ref(null)
const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(cardRef)

const cardStyle = computed(() => {
  if (isOutside.value) return {}

  const x = elementX.value
  const y = elementY.value
  const w = elementWidth.value
  const h = elementHeight.value

  // Calculate rotation (Max 3 degrees)
  const rotateX = ((y - h / 2) / (h / 2)) * -3
  const rotateY = ((x - w / 2) / (w / 2)) * 3

  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
    transition: 'box-shadow 0.3s ease, transform 0.1s ease'
  }
})

const isReverse = computed(() => props.index % 2 !== 0)

// Format date helper if not available globally
const formatDate = (date: string | number | Date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-')
}
</script>

<template>
  <article 
    ref="cardRef"
    class="relative mb-8 group/card transform-gpu"
    :style="cardStyle"
  >
    <!-- Card Content Wrapper -->
    <div 
      class="flex flex-col md:flex-row gap-0 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:shadow-gray-400/40 dark:hover:shadow-black/50 transition-all duration-300 overflow-hidden"
      :class="isReverse ? 'md:flex-row-reverse' : ''"
    >
      <!-- Cover Image -->
      <div 
        class="w-full md:w-4.5/10 h-48 md:h-64 relative overflow-hidden"
        :class="isReverse ? 'md:[clip-path:polygon(0_0,100%_0,100%_100%,8%_100%)]' : 'md:[clip-path:polygon(0_0,92%_0,100%_100%,0%_100%)]'"
      >
        <RouterLink :to="post.path || ''" class="block w-full h-full">
          <img 
            :src="post.cover || 'https://pic.imgdb.cn/item/62b1ea7b09475431291dec4b.png'" 
            :alt="post.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
            loading="lazy"
          />
          <!-- Overlay on hover -->
          <div class="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-300"></div>
        </RouterLink>
      </div>

      <!-- Content -->
      <div class="w-full md:w-5.5/10 flex flex-col justify-between py-6 px-8 relative">
        <div>
          <!-- Meta Info -->
          <div class="flex items-center flex-wrap text-xs text-gray-400 mb-4 space-x-4">
            <span class="flex items-center">
              <div i-ri-calendar-line class="mr-1 text-sm"/>
              {{ formatDate(post.date || '') }}
            </span>
            <span class="flex items-center">
              <div i-ri-file-list-2-line class="mr-1 text-sm"/>
              {{ typeof post.wordCount === 'number' && post.wordCount >= 1000 ? (post.wordCount / 1000).toFixed(1) + 'k' : (post.wordCount || 0) }}字
            </span>
            <!-- Reading time -->
            <span class="flex items-center">
              <div i-ri-time-line class="mr-1 text-sm"/>
              {{ post.readingTime || 0 }} 分钟
            </span>
          </div>

          <!-- Title -->
          <h2 class="text-xl md:text-2xl font-bold mb-4 leading-tight">
            <RouterLink :to="post.path || ''" class="text-red-400 hover:text-red-500 transition-colors">
              {{ post.title }}
            </RouterLink>
          </h2>

          <!-- Excerpt -->
          <div class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-8">
            {{ post.excerpt || (post.description ? post.description : '暂无摘要...') }}
          </div>
        </div>

        <!-- Tags/Categories -->
        <div 
          class="absolute bottom-3 flex items-center text-xs text-gray-400"
          :class="isReverse ? 'right-6' : 'left-6'"
        >
          <div v-if="post.categories" class="flex items-center gap-2">
            <div i-ri-flag-line />
            <span>
              {{ 
                typeof post.categories === 'string' 
                  ? post.categories 
                  : (Array.isArray(post.categories) && post.categories.length > 0 ? post.categories[0] : 'Article')
              }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- More Button (Ribbon Style) -->
    <div 
      class="absolute bottom-4 z-20 drop-shadow-md hover:drop-shadow-xl transition-all duration-300 hover:scale-105 origin-bottom"
      :class="isReverse ? '-left-2 origin-bottom-left' : '-right-2 origin-bottom-right'"
    >
      <RouterLink 
        :to="post.path || ''"
        class="block px-6 py-1 bg-gradient-to-r from-red-400 to-pink-500 text-white text-lg font-bold shadow-lg transition-all duration-300"
        :class="isReverse ? 'rounded-r-md rounded-tl-md' : 'rounded-l-md rounded-tr-md'"
      >
        more...
      </RouterLink>
      <!-- Fold Triangle -->
      <div 
        class="absolute top-full w-2 h-2 bg-red-800 -z-10 brightness-75"
        :class="isReverse ? 'left-0 [clip-path:polygon(0_0,100%_0,100%_100%)]' : 'right-0 [clip-path:polygon(0_0,100%_0,0_100%)]'"
      ></div>
    </div>
  </article>
</template>


