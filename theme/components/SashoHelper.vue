<script lang="ts" setup>
import { isClient, useWindowScroll, useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

const { y } = useWindowScroll()
const { height: windowHeight } = useWindowSize()

const progress = computed(() => {
  if (!isClient) return 0
  const docHeight = document.documentElement.scrollHeight - windowHeight.value
  if (docHeight <= 0) return 0
  return Math.min(100, Math.max(0, Math.round((y.value / docHeight) * 100)))
})

const showBackToTop = computed(() => y.value > 50)

function backToTop() {
  if (!isClient)
    return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="fixed bottom-8 right-8 hidden flex-col gap-3 md:flex z-50">
    <Transition name="fade">
      <div v-if="showBackToTop" class="flex flex-col gap-3">
        <button
          class="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 text-pink-500"
        >
          <div i-ri-chat-3-line text-xl />
        </button>

        <button
          class="group relative flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-pink-50 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 text-pink-500"
          @click="backToTop"
        >
          <div i-ri-arrow-up-line text-xl class="group-hover:translate-y--1 transition-transform" />
          <span class="text-[10px] font-bold mt-[-2px]">{{ progress }}%</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
