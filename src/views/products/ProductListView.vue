<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import type { Product, ProductFilters, TableViewMode } from '../../types/product'
import { mockProducts } from './data/products-mock'
import ProductsStatsCards from './components/ProductsStatsCards.vue'
import ProductsFilterBar from './components/ProductsFilterBar.vue'
import ProductsDataTable from './components/ProductsDataTable.vue'
import UsersPagination from '../users/components/UsersPagination.vue'

const PAGE_SIZE = 5
const viewMode = ref<TableViewMode>('table')
const selectedIds = ref<string[]>([])
const sortBy = ref('name')
const sortDir = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)

const filters = ref<ProductFilters>({
  keyword: '',
  category: '',
  status: '',
  dateFrom: '',
  dateTo: '',
})

const categories = computed(() => {
  const set = new Set(mockProducts.map((p) => p.category))
  return [...set].sort()
})

const filteredProducts = computed(() => {
  let list: Product[] = [...mockProducts]

  const k = filters.value.keyword.trim().toLowerCase()
  if (k) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(k) ||
        p.sku.toLowerCase().includes(k) ||
        p.category.toLowerCase().includes(k)
    )
  }
  if (filters.value.category) {
    list = list.filter((p) => p.category === filters.value.category)
  }
  if (filters.value.status) {
    list = list.filter((p) => p.status === filters.value.status)
  }
  if (filters.value.dateFrom) {
    list = list.filter((p) => p.createdAt >= filters.value.dateFrom)
  }
  if (filters.value.dateTo) {
    list = list.filter((p) => p.createdAt <= filters.value.dateTo)
  }

  list.sort((a, b) => {
    const aVal = (a as unknown as Record<string, unknown>)[sortBy.value]
    const bVal = (b as unknown as Record<string, unknown>)[sortBy.value]
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir.value === 'asc' ? aVal - bVal : bVal - aVal
    }
    const cmp = String(aVal ?? '').localeCompare(String(bVal ?? ''), 'vi')
    return sortDir.value === 'asc' ? cmp : -cmp
  })

  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / PAGE_SIZE)))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredProducts.value.slice(start, start + PAGE_SIZE)
})

const stats = computed(() => {
  const list = filteredProducts.value
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10)
  return {
    total: list.length,
    inStock: list.filter((p) => p.status === 'in_stock').length,
    outOfStock: list.filter((p) => p.status === 'out_of_stock').length,
    newThisMonth: list.filter((p) => p.createdAt >= firstDay).length,
  }
})

function applySearch() {
  currentPage.value = 1
}

const { t } = useI18n()
const router = useRouter()

function resetFilters() {
  filters.value = {
    keyword: '',
    category: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  }
  currentPage.value = 1
  toast.info(t('common.filtersReset'))
}

function handleSort(field: string) {
  if (sortBy.value === field) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortDir.value = 'asc'
  }
}

function exportReport() {
  const headers = ['ID', t('products.productName'), t('products.sku'), t('products.category'), t('products.price'), t('products.stock'), t('products.status'), t('common.createdAt')]
  const rows = filteredProducts.value.map((p) => [p.id, p.name, p.sku, p.category, p.price, p.stock, p.status, p.createdAt])
  const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${t('products.reportFilename')}-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
  toast.success(t('common.csvExported'))
}

function goAddProduct() {
  router.push({ name: 'ProductAdd' })
}

watch(totalPages, (v) => {
  if (currentPage.value > v) currentPage.value = Math.max(1, v)
})
</script>

<template>
  <div class="products-page animate__animated animate__fadeIn">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
      <div>
        <h1 class="h3 mb-1">{{ t('products.title') }}</h1>
        <p class="text-muted small mb-0">{{ t('products.subtitle') }}</p>
      </div>
      <button type="button" class="btn btn-primary" @click="goAddProduct">
        <i class="bi bi-plus-lg me-1"></i>{{ t('nav.addProduct') }}
      </button>
    </div>

    <ProductsStatsCards
      :total="stats.total"
      :in-stock="stats.inStock"
      :out-of-stock="stats.outOfStock"
      :new-this-month="stats.newThisMonth"
    />

    <ProductsFilterBar
      v-model:filters="filters"
      :categories="categories"
      @search="applySearch"
      @reset="resetFilters"
    />

    <div class="card border-0 shadow-sm mb-3">
      <div class="card-body py-2 px-3 d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div class="d-flex align-items-center gap-2">
          <span class="text-muted small">{{ t('common.displayMode') }}:</span>
          <div class="btn-group btn-group-sm" role="group">
            <button
              type="button"
              class="btn"
              :class="viewMode === 'table' ? 'btn-primary' : 'btn-outline-secondary'"
              :title="t('common.table')"
              @click="viewMode = 'table'"
            >
              <i class="bi bi-table"></i>
            </button>
            <button
              type="button"
              class="btn"
              :class="viewMode === 'grid' ? 'btn-primary' : 'btn-outline-secondary'"
              :title="t('common.cards')"
              @click="viewMode = 'grid'"
            >
              <i class="bi bi-grid-3x3-gap"></i>
            </button>
            <button
              type="button"
              class="btn"
              :class="viewMode === 'compact' ? 'btn-primary' : 'btn-outline-secondary'"
              title="Compact"
              @click="viewMode = 'compact'"
            >
              <i class="bi bi-list-ul"></i>
            </button>
          </div>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button type="button" class="btn btn-success btn-sm" @click="exportReport">
            <i class="bi bi-file-earmark-arrow-down me-1"></i>
            {{ t('common.exportReport') }}
          </button>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm overflow-hidden">
      <Transition name="fade-slide" mode="out-in">
        <div v-if="paginatedProducts.length" :key="`${viewMode}-${currentPage}`">
          <ProductsDataTable
            :products="paginatedProducts"
            :view-mode="viewMode"
            v-model:selected-ids="selectedIds"
            :sort-by="sortBy"
            :sort-dir="sortDir"
            @sort="handleSort"
          />
        </div>
        <div v-else key="empty" class="text-center py-5 text-muted">
          <i class="bi bi-box display-4 d-block mb-2"></i>
          <p class="mb-0">{{ t('products.noProductsFound') }}</p>
        </div>
      </Transition>
      <div class="card-footer bg-transparent border-top">
        <UsersPagination
          v-model:current-page="currentPage"
          :total-pages="totalPages"
          :total-items="filteredProducts.length"
          :page-size="PAGE_SIZE"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-page {
  min-height: 0;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
