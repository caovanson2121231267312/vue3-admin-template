<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { ProductDetail, ProductStatus } from '../../types/product'
import { getProductDetail } from './data/product-detail-mock'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const productId = computed(() => String(route.params.id ?? ''))
const product = ref<ProductDetail | null>(null)

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

function getStatusLabel(s: ProductStatus) {
  return statusLabel.value[s] ?? s
}
function getStatusClass(s: ProductStatus) {
  return statusClass[s] ?? 'bg-secondary'
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)
}

const mainImageIndex = ref(0)
const mainImage = computed(() => {
  const p = product.value
  if (!p?.images?.length) return null
  const idx = Math.min(mainImageIndex.value, p.images.length - 1)
  return p.images[idx]
})

watch(
  productId,
  (id) => {
    product.value = id ? getProductDetail(id) ?? null : null
    mainImageIndex.value = 0
  },
  { immediate: true }
)

function goBack() {
  router.push({ name: 'ProductList' })
}
function goEdit() {
  router.push({ name: 'ProductAdd', query: { id: productId.value } })
}
function goToOrder(orderId: string) {
  router.push({ name: 'OrderList', query: { highlight: orderId } })
}
</script>

<template>
  <div class="product-detail-page animate__animated animate__fadeIn">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'ProductList' }">{{ t('nav.productList') }}</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ (product?.name) ?? (productId || t('products.detailTitle')) }}
        </li>
      </ol>
    </nav>

    <div v-if="!product" class="alert alert-warning">
      {{ t('products.productNotFound') }}
      <button type="button" class="btn btn-sm btn-outline-primary ms-2" @click="goBack">
        {{ t('products.backToList') }}
      </button>
    </div>

    <template v-else>
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
        <h1 class="h4 mb-0">{{ product.name }}</h1>
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-outline-secondary" @click="goBack">
            <i class="bi bi-arrow-left me-1"></i>{{ t('products.backToList') }}
          </button>
          <button type="button" class="btn btn-primary" @click="goEdit">
            <i class="bi bi-pencil me-1"></i>{{ t('common.edit') }}
          </button>
        </div>
      </div>

      <div class="row g-4">
        <!-- Gallery + Info -->
        <div class="col-lg-5">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h6 class="text-muted small text-uppercase mb-2">{{ t('products.images') }}</h6>
              <div class="product-gallery mb-3">
                <div class="main-image rounded overflow-hidden bg-light mb-2" style="aspect-ratio: 1;">
                  <img
                    v-if="mainImage"
                    :src="mainImage.url"
                    :alt="mainImage.alt ?? product.name"
                    class="w-100 h-100 object-fit-cover"
                    loading="lazy"
                    @error="($event.target as HTMLImageElement).src = 'https://placehold.co/600x600?text=No+Image'"
                  />
                  <div v-else class="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                    <i class="bi bi-image fs-1"></i>
                  </div>
                </div>
                <div class="thumbnails d-flex gap-2 flex-wrap">
                  <button
                    v-for="(img, idx) in product.images"
                    :key="img.id"
                    type="button"
                    class="thumb border rounded overflow-hidden p-0"
                    :class="{ active: mainImageIndex === idx }"
                    style="width: 56px; height: 56px;"
                    @click="mainImageIndex = idx"
                  >
                    <img
                      :src="img.url"
                      :alt="img.alt ?? ''"
                      class="w-100 h-100 object-fit-cover"
                      loading="lazy"
                      @error="($event.target as HTMLImageElement).src = 'https://placehold.co/56x56?text=No'"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-7">
          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <h6 class="text-muted small text-uppercase mb-2">{{ t('products.basicInfo') }}</h6>
              <dl class="row mb-0">
                <dt class="col-sm-3">{{ t('products.sku') }}</dt>
                <dd class="col-sm-9"><code>{{ product.sku }}</code></dd>
                <dt class="col-sm-3">{{ t('products.category') }}</dt>
                <dd class="col-sm-9"><span class="badge bg-secondary bg-opacity-25 text-secondary">{{ product.category }}</span></dd>
                <dt class="col-sm-3">{{ t('products.price') }}</dt>
                <dd class="col-sm-9 fw-semibold text-primary">{{ formatPrice(product.price) }}</dd>
                <dt class="col-sm-3">{{ t('products.stock') }}</dt>
                <dd class="col-sm-9">{{ product.stock }}</dd>
                <dt class="col-sm-3">{{ t('products.status') }}</dt>
                <dd class="col-sm-9"><span class="badge" :class="getStatusClass(product.status)">{{ getStatusLabel(product.status) }}</span></dd>
                <dt class="col-sm-3">{{ t('common.createdAt') }}</dt>
                <dd class="col-sm-9">{{ product.createdAt }}</dd>
                <template v-if="product.rating != null && product.reviewCount != null">
                  <dt class="col-sm-3">{{ t('products.rating') }}</dt>
                  <dd class="col-sm-9">
                    <i class="bi bi-star-fill text-warning me-1"></i>{{ product.rating }} ({{ product.reviewCount }} {{ t('products.reviews') }})
                  </dd>
                </template>
              </dl>
              <p v-if="product.description" class="mt-3 mb-0 text-muted small">{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Variants -->
      <div v-if="product.variants?.length" class="card border-0 shadow-sm mt-4">
        <div class="card-header bg-transparent border-0 py-3">
          <h5 class="mb-0"><i class="bi bi-collection me-2"></i>{{ t('products.variants') }}</h5>
        </div>
        <div class="card-body pt-0">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>{{ t('products.sku') }}</th>
                  <th>{{ t('products.variantName') }}</th>
                  <th>{{ t('products.attributes') }}</th>
                  <th>{{ t('products.price') }}</th>
                  <th>{{ t('products.stock') }}</th>
                  <th>{{ t('products.status') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="v in product.variants" :key="v.id">
                  <td><code class="small">{{ v.sku }}</code></td>
                  <td>{{ v.name }}</td>
                  <td>
                    <span v-for="(val, key) in v.attributes" :key="key" class="badge bg-light text-dark me-1">{{ key }}: {{ val }}</span>
                  </td>
                  <td>{{ formatPrice(v.price) }}</td>
                  <td>{{ v.stock }}</td>
                  <td><span class="badge" :class="getStatusClass(v.status)">{{ getStatusLabel(v.status) }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Reviews -->
      <div class="card border-0 shadow-sm mt-4">
        <div class="card-header bg-transparent border-0 py-3">
          <h5 class="mb-0"><i class="bi bi-star me-2"></i>{{ t('products.reviews') }} ({{ product.reviews?.length ?? 0 }})</h5>
        </div>
        <div class="card-body pt-0">
          <div v-if="!product.reviews?.length" class="text-muted py-3">{{ t('products.noReviews') }}</div>
          <div v-else class="list-group list-group-flush">
            <div v-for="r in product.reviews" :key="r.id" class="list-group-item px-0">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <span class="fw-semibold">{{ r.userName }}</span>
                  <span v-if="r.verified" class="badge bg-success bg-opacity-25 text-success ms-1 small">{{ t('products.verified') }}</span>
                </div>
                <span class="text-muted small">{{ r.createdAt }}</span>
              </div>
              <div class="mt-1">
                <span v-for="i in 5" :key="i" class="me-1" :class="i <= r.rating ? 'text-warning' : 'text-muted'">
                  <i class="bi" :class="i <= r.rating ? 'bi-star-fill' : 'bi-star'"></i>
                </span>
              </div>
              <p class="mb-0 mt-1 text-secondary small">{{ r.comment }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Related orders -->
      <div class="card border-0 shadow-sm mt-4">
        <div class="card-header bg-transparent border-0 py-3">
          <h5 class="mb-0"><i class="bi bi-cart-check me-2"></i>{{ t('products.relatedOrders') }}</h5>
        </div>
        <div class="card-body pt-0">
          <div v-if="!product.relatedOrders?.length" class="text-muted py-3">{{ t('products.noRelatedOrders') }}</div>
          <div v-else class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>{{ t('products.orderCode') }}</th>
                  <th>{{ t('products.orderDate') }}</th>
                  <th>{{ t('products.quantity') }}</th>
                  <th>{{ t('products.unitPrice') }}</th>
                  <th>{{ t('products.total') }}</th>
                  <th>{{ t('products.status') }}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="o in product.relatedOrders" :key="o.orderId">
                  <td><code>{{ o.orderCode }}</code></td>
                  <td>{{ o.orderDate }}</td>
                  <td>{{ o.quantity }}</td>
                  <td>{{ formatPrice(o.unitPrice) }}</td>
                  <td>{{ formatPrice(o.total) }}</td>
                  <td><span class="badge bg-info bg-opacity-25 text-info">{{ o.status }}</span></td>
                  <td>
                    <button type="button" class="btn btn-sm btn-link p-0" @click="goToOrder(o.orderId)">{{ t('common.view') }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.product-gallery .thumb {
  cursor: pointer;
  transition: opacity 0.2s, border-color 0.2s;
}
.product-gallery .thumb:hover,
.product-gallery .thumb.active {
  border-color: var(--bs-primary) !important;
  opacity: 1;
}
.product-gallery .thumb:not(.active) {
  opacity: 0.8;
}
.object-fit-cover {
  object-fit: cover;
}
</style>
