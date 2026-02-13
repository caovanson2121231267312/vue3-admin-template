<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  loading?: boolean
}>()
const { t } = useI18n()

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

const startItem = computed(() => (props.currentPage - 1) * props.pageSize + 1)
const endItem = computed(() => Math.min(props.currentPage * props.pageSize, props.totalItems))

const pages = computed(() => {
  const total = props.totalPages
  const cur = props.currentPage
  const delta = 2
  const range: number[] = []
  const rangeWithDots: (number | 'ellipsis')[] = []
  let l: number | undefined
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= cur - delta && i <= cur + delta)) {
      range.push(i)
    }
  }
  for (const i of range) {
    if (l !== undefined && i - l !== 1) {
      rangeWithDots.push('ellipsis')
    }
    rangeWithDots.push(i)
    l = i
  }
  return rangeWithDots
})

function goTo(page: number) {
  if (page < 1 || page > props.totalPages) return
  emit('update:currentPage', page)
}
</script>

<template>
  <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 py-3">
    <div class="text-muted small">
      {{ t('common.showingResults', { start: startItem, end: endItem, total: totalItems }) }}
    </div>
    <nav :aria-label="t('common.pagination')">
      <ul class="pagination pagination-sm mb-0">
        <li class="page-item" :class="{ disabled: currentPage <= 1 }">
          <a class="page-link" href="#" :aria-label="t('common.prevPage')" @click.prevent="goTo(currentPage - 1)">
            <i class="bi bi-chevron-left"></i>
          </a>
        </li>
        <template v-for="(p, i) in pages" :key="i">
          <li v-if="p === 'ellipsis'" class="page-item disabled">
            <span class="page-link">…</span>
          </li>
          <li v-else class="page-item" :class="{ active: p === currentPage }">
            <a class="page-link" href="#" :aria-current="p === currentPage ? 'page' : undefined" @click.prevent="goTo(p as number)">{{ p }}</a>
          </li>
        </template>
        <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
          <a class="page-link" href="#" :aria-label="t('common.nextPage')" @click.prevent="goTo(currentPage + 1)">
            <i class="bi bi-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.pagination .page-link {
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
}
.pagination .page-link:hover:not(.disabled) {
  transform: scale(1.05);
}
.pagination .page-item.active .page-link {
  font-weight: 600;
}
</style>
