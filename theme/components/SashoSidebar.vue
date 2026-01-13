<script lang="ts" setup>
import { useSiteConfig, usePostList, useCategories, useTags } from 'valaxy'
import { useThemeConfig } from '../composables'
import { computed } from 'vue'

const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()
const posts = usePostList()
const categories = useCategories()
const tags = useTags()

const avatarUrl = computed(() => {
  const avatar = themeConfig.value.avatar
  const cdn = themeConfig.value.CDN
  if (cdn && avatar && !avatar.startsWith('http')) {
    return cdn + avatar
  }
  return avatar
})

const authorName = computed(() => {
  const author = siteConfig.value.author
  if (typeof author === 'string') return author
  return author?.name || 'Admin'
})

const authorDescription = computed(() => {
   const author = siteConfig.value.author
   if (typeof author === 'object' && author.intro) return author.intro
   return siteConfig.value.description
})

const postCount = computed(() => posts.value.length)
const categoryCount = computed(() => {
  const cats = categories.value as any
  if (!cats) return 0
  
  // Try to handle Map
  if (cats instanceof Map) return cats.size
  
  // Try to handle object with children
  if (cats.children) {
      if (cats.children instanceof Map) return cats.children.size
      if (Array.isArray(cats.children)) return cats.children.length
  }
  
  return 0
})
const tagCount = computed(() => Array.from(tags.value).length)

const navItems = computed(() => themeConfig.value.nav || [])
</script>

<template>
  <aside class="w-full p-6 text-center">
    <!-- Avatar -->
    <div class="mb-4 relative inline-block group">
      <div class="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-gray-100 dark:border-gray-700 transition-transform duration-500 group-hover:rotate-[360deg]">
        <img 
          v-if="avatarUrl" 
          :src="avatarUrl" 
          alt="Avatar" 
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500 font-bold">
          {{ authorName.charAt(0).toUpperCase() }}
        </div>
      </div>
    </div>

    <!-- Author Info -->
    <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-2">{{ authorName }}</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">{{ authorDescription }}</p>

    <!-- Statistics -->
    <div class="flex justify-center space-x-6 mb-6 text-center">
      <div class="flex flex-col">
        <span class="text-lg font-bold text-gray-800 dark:text-white">{{ postCount }}</span>
        <span class="text-xs text-gray-500 uppercase">文章</span>
      </div>
      <div class="flex flex-col">
        <span class="text-lg font-bold text-gray-800 dark:text-white">{{ categoryCount }}</span>
        <span class="text-xs text-gray-500 uppercase">分类</span>
      </div>
      <div class="flex flex-col">
        <span class="text-lg font-bold text-gray-800 dark:text-white">{{ tagCount }}</span>
        <span class="text-xs text-gray-500 uppercase">标签</span>
      </div>
    </div>

    <!-- Social Links (Mockup based on image) -->
    <div class="flex justify-center space-x-4 mb-8 text-gray-500">
      <a href="#" class="hover:text-blue-500 transition-colors"><div i-ri-github-line class="text-xl" /></a>
      <a href="#" class="hover:text-blue-500 transition-colors"><div i-ri-mail-line class="text-xl" /></a>
      <a href="#" class="hover:text-blue-500 transition-colors"><div i-ri-rss-line class="text-xl" /></a>
    </div>

    <!-- Vertical Menu -->
    <nav class="space-y-2">
      <template v-for="item in navItems" :key="item.text">
        <!-- Item with Submenu -->
        <div 
          v-if="item.items && item.items.length" 
          class="relative group transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-1"
        >
          <!-- Parent Item -->
          <component 
            :is="item.link ? 'RouterLink' : 'button'"
            :to="item.link"
            class="w-full flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer z-10 relative"
            :class="[
              // Only active if exact match parent link (and not relying on child active state for main highlight)
              ($route.path === item.link)
                ? 'bg-gradient-to-r from-pink-400 to-orange-400 text-white shadow-md' 
                : (item.items.some(sub => $route.path === sub.link) ? 'text-pink-500 font-bold' : 'text-gray-600 dark:text-gray-300')
            ]"
          >
            <span v-if="item.icon" :class="[item.icon, item.icon.startsWith('icon-') ? 'iconfont' : '']" class="w-6 text-center text-lg mr-2 inline-block"></span>
            <span>{{ item.text }}</span>
          </component>

          <!-- Accordion Submenu -->
          <div 
            class="overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 ease-in-out"
          >
            <!-- Inner container without background/border to blend with parent group hover -->
            <div class="pt-1 pb-1">
              <template v-for="sub in item.items" :key="sub.text">
                <RouterLink 
                  :to="sub.link"
                  class="flex items-center justify-center px-4 py-2 mx-2 rounded-md transition-colors my-1"
                  active-class="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold shadow-sm"
                  :class="[
                     $route.path === sub.link ? '' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                  ]"
                >
                  <span v-if="sub.icon" :class="[sub.icon, sub.icon.startsWith('icon-') ? 'iconfont' : '']" class="w-6 text-center text-lg opacity-80 mr-2 inline-block"></span>
                  <span>{{ sub.text }}</span>
                </RouterLink>
              </template>
            </div>
          </div>
        </div>

        <!-- Simple Item -->
        <RouterLink 
          v-else
          :to="item.link"
          class="flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 mx-1"
          active-class="bg-gradient-to-r from-pink-400 to-orange-400 text-white shadow-md"
          :class="$route.path === item.link ? '' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
        >
          <span v-if="item.icon" :class="[item.icon, item.icon.startsWith('icon-') ? 'iconfont' : '']" class="w-6 text-center text-lg mr-2 inline-block"></span>
          <span>{{ item.text }}</span>
        </RouterLink>
      </template>
    </nav>
  </aside>
</template>
