<script lang="ts" setup>
import { computed } from 'vue'
import { useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()
const isSidebarRight = computed(() => themeConfig.value.sidebar === 'right')
</script>

<template>
  <SashoMain>
    <template #main-content>
      <SashoLoading />
      <SashoBanner />

      <div id="content-start" class="relative z-20 w-full flex-grow bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
        <div class="mx-auto max-w-7xl px-4 pb-0 pt-12 lg:px-8 sm:px-6">
          <div class="flex flex-col items-start gap-8" :class="isSidebarRight ? 'lg:flex-row-reverse' : 'lg:flex-row'">
            <!-- Main Content & Footer Column -->
            <div class="min-w-0 w-full flex flex-grow flex-col gap-6 lg:w-4/5">
              <main class="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:p-6">
                <slot>
                  <RouterView />
                </slot>
              </main>
            </div>
          </div>
        </div>
      </div>
    </template>
  </SashoMain>
</template>
