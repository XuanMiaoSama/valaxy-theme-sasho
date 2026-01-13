import type { JinrishiciError, JinrishiciResult } from 'jinrishici'
import { load as loadJinrishici } from 'jinrishici'
import { onMounted, ref } from 'vue'

/**
 * 使用今日诗词
 */
export function useJinrishici() {
  const data = ref<JinrishiciResult['data'] | null>(null)
  const loading = ref(true)
  const error = ref<JinrishiciError | null>(null)
  const sentence = ref('')
  const info = ref('')

  const load = () => {
    loading.value = true
    loadJinrishici(
      (result: JinrishiciResult) => {
        data.value = result.data
        sentence.value = result.data.content
        info.value = `【${result.data.origin.dynasty}】${result.data.origin.author}《${result.data.origin.title}》`
        loading.value = false
      },
      (err: JinrishiciError) => {
        error.value = err
        loading.value = false
        console.error('今日诗词加载失败:', err)
      },
    )
  }

  onMounted(() => {
    load()
  })

  return {
    data,
    loading,
    error,
    sentence,
    info,
    load,
  }
}
