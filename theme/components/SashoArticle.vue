<script setup lang="ts">
import { useFrontmatter, usePostList } from 'valaxy'
import { computed } from 'vue'

import { useRoute } from 'vue-router'

const frontmatter = useFrontmatter()

const route = useRoute()
const posts = usePostList()

function findCurrentIndex() {
  return posts.value.findIndex((p) => p.path === route.path)
}

const nextPost = computed(() => posts.value[findCurrentIndex() - 1])
const prevPost = computed(() => posts.value[findCurrentIndex() + 1])
</script>

<template>
  <article class="article-page xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
    <div
      class="article-grid pb-16 xl:grid xl:gap-x-10 divide-y divide-gray-200 xl:pb-20 xl:divide-y-0 dark:divide-gray-700">
      
      <div class="hidden xl:block article-toc-col">
        <SashoToc />
      </div>

      <div class="article-content-col divide-y divide-gray-200 xl:pb-0 dark:divide-gray-700">
        <!-- Breadcrumb -->
        <nav class="flex items-center text-sm text-gray-500 mb-6 space-x-2">
          <RouterLink to="/" class="flex items-center hover:text-pink-500 transition-colors">
            <div i-ri-home-2-line class="mr-1" />
            首页
          </RouterLink>
        </nav>

        <header class="pb-10 space-y-1">
          <SashoDate :date="frontmatter.date" />
          <h1
            class="st-text text-3xl font-extrabold leading-9 tracking-tight md:text-4xl sm:text-3xl md:leading-10 sm:leading-9 text-gray-900 dark:text-white">
            {{ frontmatter.title }}
          </h1>
        </header>

        <slot></slot>

        <footer
          class="text-sm font-medium leading-5 divide-y divide-gray-200 dark:divide-gray-700 mt-16">
          <div v-if="nextPost && nextPost.path" class="py-8">
            <h2 class="text-xs text-gray-500 tracking-wide uppercase">
              Next Article
            </h2>
            <div class="link">
              <RouterLink :to="nextPost.path">
                {{ nextPost.title }}
              </RouterLink>
            </div>
          </div>
          <div v-if="prevPost && prevPost.path" class="py-8">
            <h2 class="text-xs text-gray-500 tracking-wide uppercase">
              Previous Article
            </h2>
            <div class="link">
              <RouterLink :to="prevPost.path">
                {{ prevPost.title }}
              </RouterLink>
            </div>
          </div>
          <div class="pt-8">
            <RouterLink class="link" to="/">
              ← Back to the blog
            </RouterLink>
          </div>
        </footer>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* 文章详情布局：宽屏时左窄右宽，提升正文可读性 */
.article-page {
  padding-top: 110px; /* 为固定导航栏留出空间 */
}

.article-grid {
  grid-template-rows: auto 1fr;
}

@media (min-width: 1280px) {
  .article-grid {
    grid-template-columns: 180px minmax(0, 1fr);
    grid-template-rows: auto;
    column-gap: 56px;
    align-items: flex-start;
    margin-left: -120px;
    margin-right: 24px;
  }

  .article-toc-col {
    grid-row: 1 / span 1;
    position: sticky;
    top: 120px;
    align-self: flex-start;
    height: fit-content;
  }

  .article-content-col {
    max-width: 960px;
    width: 100%;
  }
}
</style>
