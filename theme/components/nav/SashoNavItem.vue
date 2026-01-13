<script lang="ts" setup>
import { ref } from 'vue'
import type { NavItem } from '../../types'

defineProps<{
  item: NavItem
}>()

const isHovered = ref(false)
</script>

<template>
  <div
    class="relative group h-full flex items-center"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Link or Parent Item -->
    <AppLink
      v-if="!item.items"
      :to="item.link"
      class="nav-item flex items-center px-4 h-full transition-colors duration-200 relative hover:text-orange-400"
    >
      <!-- Iconfont (Font Class) or UnoCSS -->
      <span 
        v-if="item.icon" 
        :class="[item.icon, item.icon.startsWith('icon-') ? 'iconfont' : '']" 
        class="mr-1.5 text-lg group-hover:animate-bounce" 
      />
      
      <span>{{ item.text }}</span>
      <!-- Underline Animation -->
      <span class="absolute bottom-2 left-4 right-4 h-0.5 bg-orange-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-center"></span>
    </AppLink>

    <div
      v-else
      class="nav-item flex items-center px-4 h-full cursor-pointer transition-colors duration-200 relative hover:text-orange-400"
    >
      <!-- Iconfont (Font Class) or UnoCSS -->
      <span 
        v-if="item.icon" 
        :class="[item.icon, item.icon.startsWith('icon-') ? 'iconfont' : '']" 
        class="mr-1.5 text-lg group-hover:animate-bounce" 
      />

      <span>{{ item.text }}</span>
      <!-- Underline Animation -->
      <span class="absolute bottom-2 left-4 right-4 h-0.5 bg-orange-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-center"></span>
    </div>

    <!-- Dropdown -->
    <div
      v-if="item.items"
      class="absolute top-full left-1/2 transform -translate-x-1/2 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50"
    >
      <!-- Bubble Triangle -->
      <div class="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/95 dark:bg-gray-800/95 rotate-45 border-l border-t border-gray-100 dark:border-gray-700 z-0"></div>
      
      <div class="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-xl rounded-xl py-2 overflow-hidden border border-gray-100 dark:border-gray-700 z-10">
        <template v-for="subItem in item.items" :key="subItem.link">
          <AppLink
            :to="subItem.link"
            class="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-500 whitespace-nowrap transition-colors flex items-center"
          >
            <!-- Iconfont (Font Class) or UnoCSS -->
            <span 
              v-if="subItem.icon" 
              :class="[subItem.icon, subItem.icon.startsWith('icon-') ? 'iconfont' : '']" 
              class="w-6 text-center text-base mr-2 flex-shrink-0" 
            />
            
            <span>{{ subItem.text }}</span>
          </AppLink>
        </template>
      </div>
    </div>
  </div>
</template>

