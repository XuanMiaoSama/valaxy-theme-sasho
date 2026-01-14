<script lang="ts" setup>
import { useAppStore } from 'valaxy'

const appStore = useAppStore()
</script>

<template>
  <button
    type="button"
    class="rounded-full p-2 transition-colors hover:text-orange-400 focus:outline-none"
    aria-label="Toggle Dark Mode"
    @click="appStore.toggleDarkWithTransition"
  >
    <div v-if="!appStore.isDark" i-ri-sun-line class="text-2xl" />
    <div v-else i-ri-moon-line class="text-2xl" />
  </button>
</template>
