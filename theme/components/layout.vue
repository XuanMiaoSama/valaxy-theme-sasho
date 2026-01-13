<script lang="ts" setup>
import { isPageLoaded } from '../composables'
</script>

<template>
  <div class="min-h-screen flex flex-col antialiased">
    <SashoLoading />
    <slot name="hero" />

    <!-- <div class="mx-auto max-w-3xl px-4 xl:max-w-5xl sm:px-6 xl:px-0">
      <SashoNav />
    </div> -->

    <main
      class="mx-auto max-w-3xl flex-grow px-4 xl:max-w-5xl sm:px-6 xl:px-0"
      style="transform: translateY(40px); opacity: 0;"
      :class="{ 'animate-slide-up': isPageLoaded }"
    >
      <slot>
        <RouterView v-slot="{ Component }">
          <component :is="Component">
            <template #main-header>
              <slot name="main-header" />
            </template>

            <template #main-header-after>
              <slot name="main-header-after" />
            </template>
            <template #main>
              <slot name="main" />
            </template>
            <template #main-content>
              <slot name="main-content" />
            </template>
            <template #main-content-after>
              <slot name="main-content-after" />
            </template>
            <template #main-nav-before>
              <slot name="main-nav-before" />
            </template>
            <template #main-nav-after>
              <slot name="main-nav-after" />
            </template>
            <template #aside-custom>
              <slot name="aside-custom" />
            </template>
            <template #footer>
              <slot name="footer" />
            </template>
          </component>
        </RouterView>
      </slot>
    </main>

    <SashoHelper />

    <div class="mt-auto">
      <SashoFooter>
        <slot name="footer" />
      </SashoFooter>
    </div>
  </div>
</template>

<style scoped>
.animate-slide-up {
  animation: slideUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
