<script setup lang="ts">
import type { Post } from 'valaxy'
import { useSiteStore } from 'valaxy'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: string
  posts?: Post[]
  curPage?: number
}>(), {
  curPage: 1,
})

const siteStore = useSiteStore()
const posts = computed(() => props.posts || siteStore.postList)
</script>

<template>
  <div class="w-full">
    <!-- Header -->
    <SashoListTitle>文章列表</SashoListTitle>

    <ul class="space-y-8">
      <template v-for="(post, index) in posts" :key="post.path">
        <Transition name="fade">
          <li v-if="post">
            <SashoArticleCard :post="post" :index="index" />
          </li>
        </Transition>
      </template>
    </ul>
  </div>
</template>
