<script lang="ts" setup>
import type { NavItem } from '../../types'

defineProps<{
  item: NavItem
}>()
</script>

<template>
  <AppLink
    :to="item.link"
    class="nav-item relative h-full flex items-center px-4 transition-colors duration-200 hover:text-orange-400"
  >
    <span
      v-if="item.icon"
      :class="[item.icon, item.icon.startsWith('icon-') ? 'iconfont' : '']"
      class="mr-1.5 text-lg group-hover:animate-bounce"
    />

    <span>{{ item.text }}</span>
    <!-- Underline Animation -->
    <span class="absolute bottom-2 left-4 right-4 h-0.5 origin-center scale-x-0 transform bg-orange-400 transition-transform duration-300 group-hover:scale-x-100" />
  </AppLink>
</template>
