<script setup lang="ts">
import { useOutline } from 'valaxy'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useThrottleFn } from '@vueuse/core'

const { headers } = useOutline()
const activeHeader = ref<string>('')
const isClickScrolling = ref(false)

// 递归判断标题本身或其子级是否在激活路径中
const isHeaderActiveOrAncestor = (header: any, activeLink: string): boolean => {
  if (header.link === activeLink) return true
  if (header.children) {
    return header.children.some((child: any) => isHeaderActiveOrAncestor(child, activeLink))
  }
  return false
}

const handleClick = (link: string) => {
  const slug = link.replace('#', '')
  const element = document.getElementById(slug)
  if (element) {
    isClickScrolling.value = true
    activeHeader.value = link
    
    // 固定头部偏移，避免被顶栏遮挡
    const offset = 100 
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - offset
  
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })

    // 滚动动画结束后解除点击锁，允许继续监听自然滚动
    setTimeout(() => {
      isClickScrolling.value = false
    }, 1000)
  }
}

// 将多层目录扁平化，便于计算当前滚动命中的标题
const getAllLinks = (headersList: any[]): string[] => {
  let links: string[] = []
  headersList.forEach(header => {
    links.push(header.link)
    if (header.children) {
      links = links.concat(getAllLinks(header.children))
    }
  })
  return links
}

// 节流后的滚动监听，依据阅读位置展开/收起目录
const updateActiveHeader = useThrottleFn(() => {
  if (isClickScrolling.value) return

  const allLinks = getAllLinks(headers.value)
  let currentActive = ''
  
  // 找到“阅读线”(视口上方一定距离)之上的最后一个标题
  for (const link of allLinks) {
    const slug = link.replace('#', '')
    const element = document.getElementById(slug)
    if (element) {
      const rect = element.getBoundingClientRect()
      // 小于阈值说明已经阅读到该标题，记录为候选
      if (rect.top < 120) {
        currentActive = link
      } else {
        // 遇到第一个未到达阈值的位置即可中断
        break
      }
    }
  }

  if (currentActive) {
    activeHeader.value = currentActive
  } else if (allLinks.length > 0) {
    // 回到页首时保持目录折叠
    const firstSlug = allLinks[0].replace('#', '')
    const firstEl = document.getElementById(firstSlug)
    if (firstEl && firstEl.getBoundingClientRect().top < window.innerHeight) {
       activeHeader.value = ''
    }
  }
}, 100)

onMounted(() => {
  window.addEventListener('scroll', updateActiveHeader)
  // 首次渲染后执行一次，保证刷新后状态正确
  nextTick(() => {
    updateActiveHeader()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveHeader)
})
</script>

<template>
  <div class="sasho-toc hidden xl:block">
    <div class="flex gap-2 mb-6">
      <button class="px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 text-white shadow-md bg-gradient-to-r from-pink-400 to-orange-400 hover:shadow-lg transition-all">
        <div i-ri-list-check class="text-lg" />
        <span>文章目录</span>
      </button>
      <button class="px-3 py-1.5 rounded-lg text-white shadow-md bg-gradient-to-r from-pink-400 to-orange-400 hover:shadow-lg transition-all">
        <div i-ri-apps-line class="text-lg" />
      </button>
    </div>

    <nav aria-labelledby="doc-outline-aria-label">
      <ul class="space-y-2 text-lg">
        <li v-for="header in headers" :key="header.link">
          <a 
            :href="header.link" 
            @click.prevent="handleClick(header.link)"
            class="block text-gray-500 transition-colors border-l-2 border-transparent py-1 truncate transition-all duration-300 leading-relaxed hover:text-blue-500"
            :class="[
              isHeaderActiveOrAncestor(header, activeHeader) 
                ? 'text-orange-500 font-bold border-orange-400 pl-4' 
                : 'pl-3'
            ]"
          >
            {{ header.title }}
          </a>
          
          <!-- Children: Only show if parent (current header) is part of the active path -->
          <ul 
            v-if="header.children && header.children.length && isHeaderActiveOrAncestor(header, activeHeader)" 
            class="mt-2 space-y-2 animate-fade-in"
          >
             <li v-for="child in header.children" :key="child.link">
                <a 
                  :href="child.link"
                  @click.prevent="handleClick(child.link)"
                  class="block text-gray-500 transition-colors border-l-2 border-transparent py-1 truncate transition-all duration-300 text-base leading-relaxed hover:text-blue-500"
                  :style="{ paddingLeft: '1.5rem' }"
                  :class="[
                    isHeaderActiveOrAncestor(child, activeHeader)
                      ? 'text-orange-500 font-bold border-orange-400' 
                      : ''
                  ]"
                >
                  {{ child.title }}
                </a>
                
                <!-- Grandchildren (if any) -->
                <ul 
                  v-if="child.children && child.children.length && isHeaderActiveOrAncestor(child, activeHeader)"
                  class="mt-2 space-y-2 animate-fade-in"
                >
                  <li v-for="grandchild in child.children" :key="grandchild.link">
                    <a
                      :href="grandchild.link"
                      @click.prevent="handleClick(grandchild.link)"
                      class="block text-gray-500 transition-colors border-l-2 border-transparent py-1 truncate transition-all duration-300 text-base leading-relaxed hover:text-blue-500"
                      :style="{ paddingLeft: '2.5rem' }"
                       :class="[
                        isHeaderActiveOrAncestor(grandchild, activeHeader)
                          ? 'text-orange-500 font-bold border-orange-400' 
                          : ''
                      ]"
                    >
                      {{ grandchild.title }}
                    </a>
                  </li>
                </ul>
             </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.sasho-toc {
  position: sticky; /* 目录随滚动固定 */
  top: 120px; /* 与顶部导航保持安全距离 */
  max-height: calc(100vh - 140px);
  overflow-y: auto;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.sasho-toc::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.sasho-toc {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
