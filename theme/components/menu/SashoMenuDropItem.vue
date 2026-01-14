<script lang="ts" setup>
import type { NavItem } from '../../types'

defineProps<{
  item: NavItem
}>()
</script>

<template>
  <AppLink
    :to="item.link"
    class="block flex items-center whitespace-nowrap px-4 py-2.5 text-sm text-gray-600 transition-colors"
    dark="text-gray-300 hover:bg-gray-700"
    hover="bg-orange-50 text-orange-500"
  >
    <!-- Iconfont (Font Class) or UnoCSS -->
    <span
      v-if="item.icon"
      :class="[item.icon, item.icon.startsWith('icon-') ? 'iconfont' : '']"
      class="mr-2 w-6 flex-shrink-0 text-center text-base"
    />

    <span>{{ item.text }}</span>
  </AppLink>
</template>
