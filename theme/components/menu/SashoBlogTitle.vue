<script lang="ts" setup>
import { useSiteConfig } from 'valaxy'
import { isPageLoaded } from '../../composables'

const siteConfig = useSiteConfig()
</script>

<template>
  <RouterLink
    to="/"
    class="group absolute left-0 flex flex-shrink-0 items-center"
    :class="{ 'animate-fade-in-left': isPageLoaded }"
    :aria-label="siteConfig.title"
  >
    <img
      v-if="siteConfig.favicon"
      class="mr-2 h-8 w-8 transition-transform group-hover:rotate-12"
      :src="siteConfig.favicon"
      alt="logo"
    >
    <span class="text-xl font-bold tracking-wider font-serif">{{ siteConfig.title }}</span>
  </RouterLink>
</template>
