<template>
  <div>
    <div
      class="absolute left-1/2 top-full z-50 translate-y-2 transform pt-4 opacity-0 transition-all group-hover:visible -translate-x-1/2 group-hover:translate-y-0 group-hover:opacity-100"
    >
      <!-- Bubble Triangle -->
      <div class="absolute left-1/2 top-2 z-0 h-4 w-4 rotate-45 transform bg-white/95 -translate-x-1/2 dark:bg-gray-800/95" />

      <div class="relative z-10 overflow-hidden rounded-xl bg-white/95 py-2 shadow-xl backdrop-blur-md dark:bg-gray-800/95">
        <slot />
      </div>
    </div>
  </div>
</template>
