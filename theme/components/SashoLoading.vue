<script lang="ts">
// Global state to track if it's the first load in this session
let isFirstLoad = true
</script>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { isPageLoaded } from '../composables'

// Only show if it is the first load
const visible = ref(isFirstLoad)

onMounted(() => {
  if (!visible.value) {
    isPageLoaded.value = true
    return
  }
  
  // Mark as loaded for future component mounts
  isFirstLoad = false
  
  const minTime = 800 // Minimum display time in ms
  const start = Date.now()
  
  const finish = () => {
    const elapsed = Date.now() - start
    const remaining = Math.max(0, minTime - elapsed)
    
    setTimeout(() => {
      visible.value = false
      // Start nav animation after loading fades out
      setTimeout(() => {
        isPageLoaded.value = true
      }, 300)
    }, remaining)
  }

  if (document.readyState === 'complete') {
    finish()
  } else {
    window.addEventListener('load', finish)
    // Fallback
    setTimeout(finish, 5000)
  }
})
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-900 select-none">
      <div class="loader-container">
         <div class="loader"></div>
      </div>
      <div class="mt-6 text-lg font-serif tracking-[0.3em] text-gray-400 animate-pulse">
        LOADING
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-leave-active {
  transition: opacity 0.6s ease-in-out;
}

.fade-leave-to {
  opacity: 0;
}

.loader {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0,0,0,0.1);
  border-top-color: var(--va-c-primary, #e06c75);
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;
}

.dark .loader {
  border-color: rgba(255,255,255,0.1);
  border-top-color: var(--va-c-primary, #e06c75);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
