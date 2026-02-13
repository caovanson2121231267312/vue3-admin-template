<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Product, ProductStatus, TableViewMode } from '../../../types/product'

const props = defineProps<{
  products: Product[]
  viewMode: TableViewMode
  selectedIds: string[]
  sortBy: string
  sortDir: 'asc' | 'desc'
}>()

const emit = defineEmits<{
  'update:selectedIds': [value: string[]]
  sort: [field: string]
}>()

const { t } = useI18n()

const statusLabel = computed<Record<ProductStatus, string>>(() => ({
  in_stock: t('products.statusInStock'),
  out_of_stock: t('products.statusOutOfStock'),
  discontinued: t('products.statusDiscontinued'),
}))

const statusClass: Record<ProductStatus, string> = {
  in_stock: 'bg-success',
  out_of_stock: 'bg-warning text-dark',
  discontinued: 'bg-secondary',
}

function getStatusLabel(status: ProductStatus) {
  return statusLabel.value[status] ?? status
}

function getStatusClass(status: ProductStatus) {
  return statusClass[status] ?? 'bg-secondary'
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)
}

const allSelected = computed(() => props.products.length > 0 && props.selectedIds.length === props.products.length)
const someSelected = computed(() => props.selectedIds.length > 0)

function toggleAll() {
  if (allSelected.value) {
    emit('update:selectedIds', [])
  } else {
    emit('update:selectedIds', props.products.map((p) => p.id))
  }
}

function toggleOne(id: string) {
  const set = new Set(props.selectedIds)
  if (set.has(id)) set.delete(id)
  else set.add(id)
  emit('update:selectedIds', [...set])
}

function handleSort(field: string) {
  emit('sort', field)
}
</script>

<template>
  <div v-if="viewMode === 'table'" class="table-responsive">
    <table class="table table-hover table-striped align-middle mb-0 products-table">
      <thead class="table-light">
        <tr>
          <th class="products-table__th-check">
            <input
              type="checkbox"
              class="form-check-input"
              :checked="allSelected"
              :indeterminate="someSelected && !allSelected"
              @change="toggleAll"
            />
          </th>
          <th class="products-table__th-name">
            <span class="sortable" @click="handleSort('name')">{{ t('products.productName') }}</span>
            <i v-if="sortBy === 'name'" class="bi ms-1" :class="sortDir === 'asc' ? 'bi-caret-up-fill' : 'bi-caret-down-fill'"></i>
          </th>
          <th class="products-table__th-sku">
            <span class="sortable" @click="handleSort('sku')">{{ t('products.sku') }}</span>
            <i v-if="sortBy === 'sku'" class="bi ms-1" :class="sortDir === 'asc' ? 'bi-caret-up-fill' : 'bi-caret-down-fill'"></i>
          </th>
          <th class="products-table__th-category">{{ t('products.category') }}</th>
          <th class="products-table__th-price">
            <span class="sortable" @click="handleSort('price')">{{ t('products.price') }}</span>
            <i v-if="sortBy === 'price'" class="bi ms-1" :class="sortDir === 'asc' ? 'bi-caret-up-fill' : 'bi-caret-down-fill'"></i>
          </th>
          <th class="products-table__th-stock">{{ t('products.stock') }}</th>
          <th class="products-table__th-status">{{ t('products.status') }}</th>
          <th class="products-table__th-date">{{ t('common.createdAt') }}</th>
          <th class="products-table__th-actions text-end">{{ t('common.actions') }}</th>
        </tr>
      </thead>
      <TransitionGroup name="list" tag="tbody">
        <tr v-for="(product, index) in products" :key="product.id" class="animate__animated animate__fadeIn" :style="{ animationDelay: `${index * 0.03}s` }">
          <td class="products-table__td-check"><input type="checkbox" class="form-check-input" :checked="selectedIds.includes(product.id)" @change="toggleOne(product.id)" /></td>
          <td class="products-table__td-name">
            <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="text-decoration-none text-dark fw-semibold text-truncate d-inline-block" :title="product.name" style="max-width: 100%">{{ product.name }}</router-link>
          </td>
          <td class="products-table__td-sku"><span class="text-muted">{{ product.sku }}</span></td>
          <td class="products-table__td-category"><span class="badge bg-secondary bg-opacity-25 text-secondary">{{ product.category }}</span></td>
          <td class="products-table__td-price">{{ formatPrice(product.price) }}</td>
          <td class="products-table__td-stock">{{ product.stock }}</td>
          <td class="products-table__td-status"><span class="badge" :class="getStatusClass(product.status)">{{ getStatusLabel(product.status) }}</span></td>
          <td class="products-table__td-date"><span class="text-nowrap">{{ product.createdAt }}</span></td>
          <td class="products-table__td-actions text-end">
            <div class="btn-group btn-group-sm">
              <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="btn btn-outline-info" :title="t('common.view')"><i class="bi bi-eye"></i></router-link>
              <button type="button" class="btn btn-outline-primary" :title="t('common.edit')"><i class="bi bi-pencil"></i></button>
              <button type="button" class="btn btn-outline-danger" :title="t('common.delete')"><i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
      </TransitionGroup>
    </table>
  </div>

  <div v-if="viewMode === 'grid'" class="row g-3">
    <TransitionGroup name="list" class="row g-3">
      <div v-for="(product, index) in products" :key="product.id" class="col-12 col-sm-6 col-lg-4 col-xl-3">
        <div class="card border-0 shadow-sm h-100 product-card animate__animated animate__fadeInUp" :style="{ animationDelay: `${index * 0.04}s` }">
          <div class="card-body">
            <div class="d-flex align-items-start justify-content-between mb-2">
              <div class="rounded bg-primary bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 48px; height: 48px">
                <i class="bi bi-box-seam text-primary fs-4"></i>
              </div>
              <span class="badge" :class="getStatusClass(product.status)">{{ getStatusLabel(product.status) }}</span>
            </div>
            <h6 class="card-title mb-1">
              <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="text-decoration-none text-dark">{{ product.name }}</router-link>
            </h6>
            <p class="card-text small text-muted mb-2">{{ product.sku }} · {{ product.category }}</p>
            <div class="d-flex flex-wrap gap-1 mb-2">
              <span class="fw-semibold text-primary">{{ formatPrice(product.price) }}</span>
              <span class="text-muted small">· {{ t('products.stock') }}: {{ product.stock }}</span>
            </div>
            <p class="small text-muted mb-0">{{ product.createdAt }}</p>
            <div class="mt-2 pt-2 border-top d-flex gap-1">
              <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="btn btn-sm btn-outline-info flex-grow-1"><i class="bi bi-eye me-1"></i>{{ t('common.view') }}</router-link>
              <button type="button" class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil me-1"></i>{{ t('common.edit') }}</button>
              <button type="button" class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>

  <div v-if="viewMode === 'compact'" class="list-group list-group-flush">
    <TransitionGroup name="list">
      <div v-for="(product, index) in products" :key="product.id" class="list-group-item list-group-item-action d-flex align-items-center py-2 animate__animated animate__fadeIn" :style="{ animationDelay: `${index * 0.02}s` }">
        <input type="checkbox" class="form-check-input me-3 flex-shrink-0" :checked="selectedIds.includes(product.id)" @change="toggleOne(product.id)" />
        <div class="flex-grow-1 min-width-0">
          <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="text-decoration-none fw-semibold text-dark">{{ product.name }}</router-link>
          <span class="text-muted small ms-2">{{ product.sku }}</span>
        </div>
        <span class="badge me-2" :class="getStatusClass(product.status)">{{ getStatusLabel(product.status) }}</span>
        <span class="text-nowrap me-2">{{ formatPrice(product.price) }}</span>
        <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="btn btn-sm btn-link p-0 text-info me-1"><i class="bi bi-eye"></i></router-link>
        <button type="button" class="btn btn-sm btn-link p-0 text-primary me-1"><i class="bi bi-pencil"></i></button>
        <button type="button" class="btn btn-sm btn-link p-0 text-danger"><i class="bi bi-trash"></i></button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.products-table {
  width: 100%;
  table-layout: fixed;
}
.products-table thead th {
  font-weight: 600;
  font-size: 0.8125rem;
  color: var(--bs-secondary);
  padding: 0.65rem 0.75rem;
  border-bottom: 1px solid var(--bs-border-color);
}
.products-table__th-check { width: 3%; }
.products-table__th-name { width: 18%; }
.products-table__th-sku { width: 12%; }
.products-table__th-category { width: 12%; }
.products-table__th-price { width: 12%; }
.products-table__th-stock { width: 8%; }
.products-table__th-status { width: 10%; }
.products-table__th-date { width: 10%; }
.products-table__th-actions { width: 13%; }

.products-table tbody td {
  padding: 0.65rem 0.75rem;
  font-size: 0.875rem;
  overflow: hidden;
}
.products-table__td-name,
.products-table__td-sku {
  max-width: 0;
}
.products-table .sortable {
  cursor: pointer;
  user-select: none;
}
.products-table .sortable:hover {
  color: var(--bs-primary);
}

@media (max-width: 991.98px) {
  .products-table {
    table-layout: auto;
    width: max-content;
    min-width: 100%;
  }
  .products-table__th-check { width: 40px; }
  .products-table__th-name { min-width: 140px; }
  .products-table__th-sku { min-width: 100px; }
  .products-table__th-category { min-width: 90px; }
  .products-table__th-price { min-width: 90px; }
  .products-table__th-stock { min-width: 60px; }
  .products-table__th-status { min-width: 90px; }
  .products-table__th-date { min-width: 95px; }
  .products-table__th-actions { min-width: 100px; }
}

.product-card {
  transition: box-shadow 0.2s ease;
}
.product-card:hover {
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.08) !important;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
.list-move {
  transition: transform 0.3s ease;
}
</style>
