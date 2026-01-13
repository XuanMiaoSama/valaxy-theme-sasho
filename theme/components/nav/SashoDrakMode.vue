<script lang="ts" setup>
import { useAppStore } from 'valaxy';

const appStore = useAppStore()
</script>

<template>
  <button
    type="button"
    class="p-2 rounded-full transition-colors focus:outline-none hover:text-orange-400"
    aria-label="Toggle Dark Mode"
    @click="appStore.toggleDarkWithTransition">
    <div v-if="!appStore.isDark" i-ri-sun-line class="text-2xl"></div>
    <div v-else i-ri-moon-line class="text-2xl"></div>
  </button>
</template>
