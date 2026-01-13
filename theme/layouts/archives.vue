<script lang="ts" setup>
import { useFrontmatter, useSiteStore } from 'valaxy'
import { computed } from 'vue'

const site = useSiteStore()
const frontmatter = useFrontmatter()

const archives = computed(() => {
  const posts = site.postList.filter(post => !post.hide)
  const map = new Map<number, typeof posts>()

  posts.forEach((post) => {
    const year = new Date(post.date || '').getFullYear()
    if (!map.has(year)) {
      map.set(year, [])
    }
    map.get(year)!.push(post)
  })

  return Array.from(map.entries()).sort((a, b) => b[0] - a[0])
})
</script>

<template>
  <Layout>
    <template #hero>
      <SashoPageHeader :title="frontmatter.title" :image="frontmatter.image" :icon="frontmatter.icon" />
    </template>

    <template #main-content>
      <div class="mx-auto max-w-3xl px-4 py-8">
        <div v-for="[year, posts] in archives" :key="year" class="mb-12 animate-fade-in-up">
          <h2 class="relative mb-6 border-l-4 border-blue-500 pl-4 text-3xl text-gray-900 font-bold dark:text-white">
            {{ year }}
          </h2>
          <div class="space-y-6">
            <router-link
              v-for="post in posts"
              :key="post.path"
              :to="post.path || ''"
              class="group block"
            >
              <div class="flex items-baseline gap-4 rounded-lg p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                <span class="whitespace-nowrap text-sm text-gray-500 font-mono">
                  {{ new Date(post.date || '').toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }) }}
                </span>
                <span class="text-lg text-gray-700 transition-colors dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {{ post.title }}
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}
</style>
