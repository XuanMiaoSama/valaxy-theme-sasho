<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)

const handleScroll = () => {
  const currentScroll = window.scrollY || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  // 计算滚动进度 (0-100)
  const maxScroll = documentHeight - windowHeight
  const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0
  scrollProgress.value = 100 - progress
}

const handleClick = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <img 
      src="../assets/images/scroll/scroll.png" 
      class="fixed right-5 z-40 scroll-cat-float transition-bottom duration-500 ease-out cursor-pointer"
      :style="{ bottom: `${scrollProgress}vh` }"
      @click="handleClick"
    />
</template>