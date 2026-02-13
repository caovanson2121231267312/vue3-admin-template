<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ProductFilters, ProductStatus } from '../../../types/product'

const props = defineProps<{
  filters: ProductFilters
  categories?: string[]
}>()

const emit = defineEmits<{
  'update:filters': [value: ProductFilters]
  search: []
  reset: []
}>()

const { t } = useI18n()
const expanded = ref(false)

const statusOptions = computed<{ value: ProductStatus | ''; label: string }[]>(() => [
  { value: '', label: t('products.allStatuses') },
  { value: 'in_stock', label: t('products.statusInStock') },
  { value: 'out_of_stock', label: t('products.statusOutOfStock') },
  { value: 'discontinued', label: t('products.statusDiscontinued') },
])

const categoryOptions = computed(() => {
  const list = props.categories ?? []
  return [{ value: '', label: t('products.allCategories') }, ...list.map((c) => ({ value: c, label: c }))]
})

function update(key: keyof ProductFilters, value: string) {
  emit('update:filters', { ...props.filters, [key]: value })
}

function search() {
  emit('search')
}

function reset() {
  emit('reset')
}
</script>

<template>
  <div class="card border-0 shadow-sm mb-4 animate__animated animate__fadeIn">
    <div class="card-body p-3 p-md-4">
      <div class="row g-2 align-items-center flex-wrap">
        <div class="col-12 col-md-6 col-lg-4">
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted"></i></span>
            <input
              :value="filters.keyword"
              type="text"
              class="form-control border-start-0 ps-0"
              :placeholder="t('products.placeholderSearch')"
              @input="update('keyword', ($event.target as HTMLInputElement).value)"
              @keyup.enter="search"
            />
          </div>
        </div>
        <div class="col-auto d-flex gap-2 flex-wrap">
          <button type="button" class="btn btn-primary" @click="search">
            <i class="bi bi-search me-1"></i> {{ t('common.search') }}
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            :class="{ active: expanded }"
            :aria-expanded="expanded"
            @click="expanded = !expanded"
          >
            <i class="bi me-1" :class="expanded ? 'bi-filter-circle-fill' : 'bi-filter-circle'"></i>
            {{ t('common.advancedFilters') }}
          </button>
          <button type="button" class="btn btn-outline-secondary" @click="reset">
            <i class="bi bi-arrow-counterclockwise me-1"></i> {{ t('common.reset') }}
          </button>
        </div>
      </div>

      <Transition name="filter-slide">
        <div v-show="expanded" class="filter-advanced mt-4 pt-4 border-top">
          <div class="row g-3">
            <div class="col-12 col-sm-6 col-md-4">
              <label class="form-label small text-muted">{{ t('products.category') }}</label>
              <select :value="filters.category" class="form-select form-select-sm" @change="update('category', ($event.target as HTMLSelectElement).value)">
                <option v-for="opt in categoryOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <label class="form-label small text-muted">{{ t('products.status') }}</label>
              <select :value="filters.status" class="form-select form-select-sm" @change="update('status', ($event.target as HTMLSelectElement).value)">
                <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <label class="form-label small text-muted">{{ t('common.fromDate') }}</label>
              <input
                :value="filters.dateFrom"
                type="date"
                class="form-control form-control-sm"
                @input="update('dateFrom', ($event.target as HTMLInputElement).value)"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <label class="form-label small text-muted">{{ t('common.toDate') }}</label>
              <input
                :value="filters.dateTo"
                type="date"
                class="form-control form-control-sm"
                @input="update('dateTo', ($event.target as HTMLInputElement).value)"
              />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.filter-slide-enter-active,
.filter-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.filter-slide-enter-from,
.filter-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.input-group .form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}
</style>
