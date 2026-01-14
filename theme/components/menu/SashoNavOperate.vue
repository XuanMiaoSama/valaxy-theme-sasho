<script lang="ts" setup>
import { isPageLoaded } from '../../composables'
</script>

<template>
  <div
    class="absolute right-0 flex items-center space-x-4"
    :class="{ 'animate-fade-in-right': isPageLoaded }"
  >
    <!-- Dark Mode Toggle -->
    <SashoDarkMode />

    <!-- Search Button -->
    <SashoSearch />

    <!-- Mobile Menu Button (Visible on small screens) -->
    <div class="md:hidden">
      <div i-ri-menu-line class="text-2xl" />
    </div>
  </div>
</template>
