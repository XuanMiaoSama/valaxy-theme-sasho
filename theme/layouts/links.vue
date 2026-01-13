<script lang="ts" setup>
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <Layout>
    <template #hero>
      <SashoPageHeader :title="frontmatter.title" :image="frontmatter.image" :icon="frontmatter.icon" />
    </template>

    <template #main-content>
      <div class="mb-8 max-w-none prose dark:prose-invert">
        <slot>
          <RouterView />
        </slot>
      </div>

      <div v-if="frontmatter.links" class="grid grid-cols-1 my-8 gap-6 lg:grid-cols-3 md:grid-cols-2">
        <a
          v-for="link in frontmatter.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          class="group relative flex items-center border border-gray-200 rounded-xl bg-white p-4 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 !no-underline hover:shadow-lg hover:-translate-y-1"
        >
          <div class="mr-4 flex-shrink-0">
            <img :src="link.avatar" :alt="link.name" class="h-16 w-16 rounded-full object-cover transition-transform duration-500 group-hover:rotate-12">
          </div>
          <div class="flex flex-col overflow-hidden">
            <span class="truncate text-lg text-gray-900 font-bold transition-colors dark:text-white group-hover:text-blue-500">{{ link.name }}</span>
            <span class="line-clamp-2 mt-1 text-sm text-gray-500 dark:text-gray-400">{{ link.desc }}</span>
          </div>
        </a>
      </div>

      <ValaxyComment />
    </template>
  </Layout>
</template>
