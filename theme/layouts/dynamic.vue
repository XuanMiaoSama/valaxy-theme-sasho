<script lang="ts" setup>
import { useFrontmatter, useSiteStore } from 'valaxy'
import { computed } from 'vue'
import { useThemeConfig } from '../composables'

const site = useSiteStore()
const frontmatter = useFrontmatter()
const themeConfig = useThemeConfig()

const notes = computed(() => {
  return site.postList.filter((post) => {
    return post.path?.startsWith('/notes/') && !post.path?.endsWith('/notes/')
  }).sort((a, b) => {
    return new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
  })
})

const avatar = computed(() => themeConfig.value.avatar)
</script>

<template>
  <Layout>
    <template #hero>
      <SashoPageHeader :title="frontmatter.title" :image="frontmatter.image" :icon="frontmatter.icon" />
    </template>

    <template #main-content>
      <div class="mx-auto max-w-2xl px-4 py-8">
        <h1 class="mb-12 text-center text-3xl font-bold">
          我的动态
        </h1>

        <div class="relative before:absolute before:bottom-4 before:left-8 before:top-4 before:w-0.5 space-y-8 before:bg-gray-200 before:content-[''] dark:before:bg-gray-700">
          <div v-for="note in notes" :key="note.path" class="group relative pl-20">
            <!-- Avatar/Dot -->
            <div class="absolute left-0 top-0 w-16 flex justify-center">
              <div class="z-10 h-16 w-16 overflow-hidden border-4 border-white rounded-full bg-white shadow-sm dark:border-gray-900">
                <img :src="avatar" alt="Avatar" class="h-full w-full object-cover">
              </div>
            </div>

            <!-- Content Bubble -->
            <div class="relative border border-gray-100 rounded-2xl bg-white p-6 shadow-sm transition-shadow dark:border-gray-700 dark:bg-gray-800 hover:shadow-md">
              <!-- Arrow -->
              <div class="absolute top-6 h-4 w-4 rotate-45 transform border-b border-l border-gray-100 bg-white -left-2 dark:border-gray-700 dark:bg-gray-800" />

              <div class="mb-2 text-sm text-gray-400">
                {{ new Date(note.date || '').toLocaleString() }}
              </div>

              <div class="max-w-none prose dark:prose-invert">
                <div v-if="note.excerpt" v-html="note.excerpt" />
                <div v-else class="text-gray-500 italic">
                  点击查看详情...
                </div>
                <!-- Link to full note if needed -->
                <div v-if="note.path" class="mt-2">
                  <router-link :to="note.path" class="text-sm text-blue-500 hover:underline">
                    查看详情
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div v-if="notes.length === 0" class="py-12 text-center text-gray-500">
            暂时没有动态哦~
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>
