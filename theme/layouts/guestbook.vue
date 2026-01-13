<script lang="ts" setup>
import { useFrontmatter } from 'valaxy'
import { useJinrishici } from '../composables'

const frontmatter = useFrontmatter()

// 诗词数据
const { sentence: poemSentence, info: poemInfo } = useJinrishici()
</script>

<template>
  <Layout>
    <template #hero>
      <SashoPageHeader :title="frontmatter.title" :image="frontmatter.image" :icon="frontmatter.icon" />
    </template>

    <template #main-content>
      <div class="mb-8 max-w-none text-center prose dark:prose-invert">
        <div v-if="poemSentence" class="poem-sentence">
          {{ poemSentence }}
        </div>
        <div v-if="poemInfo" class="poem-info text-sm opacity-70">
          {{ poemInfo }}
        </div>
        <p>欢迎留言~</p>
      </div>

      <ValaxyComment />
    </template>
  </Layout>
</template>
