<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'
import type { ProductStatus } from '../../types/product'
import { getProductDetail } from './data/product-detail-mock'
import RichTextEditor from '../../components/RichTextEditor.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const isEditMode = computed(() => Boolean(route.query.id))

interface FormImage {
  id: string
  url: string
  alt: string
  sortOrder: number
}

interface FormVariant {
  id: string
  sku: string
  name: string
  attrKey: string
  attrValue: string
  price: string
  stock: string
  status: ProductStatus
}

const name = ref('')
const sku = ref('')
const category = ref('')
const description = ref('')
const price = ref('')
const stock = ref('')
const status = ref<ProductStatus>('in_stock')

const images = ref<FormImage[]>([])
const variants = ref<FormVariant[]>([])

const categories = ['Electronics', 'Clothing', 'Accessories', 'Books', 'Other']

const errors = ref<Record<string, string>>({})

const summaryStatusLabel = computed(() => {
  const map: Record<ProductStatus, string> = {
    in_stock: t('products.statusInStock'),
    out_of_stock: t('products.statusOutOfStock'),
    discontinued: t('products.statusDiscontinued'),
  }
  return map[status.value] ?? status.value
})

function nextId() {
  return String(Date.now()) + Math.random().toString(36).slice(2, 6)
}

function addImage() {
  images.value.push({ id: nextId(), url: '', alt: '', sortOrder: images.value.length })
}
function removeImage(idx: number) {
  images.value.splice(idx, 1)
}

function onImageFileSelect(event: Event, idx: number) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !file.type.startsWith('image/')) return
  const reader = new FileReader()
  reader.onload = () => {
    if (images.value[idx]) images.value[idx].url = reader.result as string
  }
  reader.readAsDataURL(file)
  input.value = ''
}

function addVariant() {
  variants.value.push({
    id: nextId(),
    sku: '',
    name: '',
    attrKey: 'Size',
    attrValue: '',
    price: '',
    stock: '',
    status: 'in_stock',
  })
}
function removeVariant(idx: number) {
  variants.value.splice(idx, 1)
}

function validate(): boolean {
  const e: Record<string, string> = {}
  if (!name.value.trim()) e.name = t('products.form.nameRequired')
  if (!sku.value.trim()) e.sku = t('products.form.skuRequired')
  if (!category.value) e.category = t('products.form.categoryRequired')
  const priceNum = Number(price.value)
  if (price.value === '' || isNaN(priceNum) || priceNum < 0) e.price = t('products.form.priceInvalid')
  const stockNum = Number(stock.value)
  if (stock.value === '' || isNaN(stockNum) || stockNum < 0) e.stock = t('products.form.stockInvalid')
  errors.value = e
  return Object.keys(e).length === 0
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)
}

function handleSubmit() {
  if (!validate()) {
    toast.error(t('products.form.fixErrors'))
    return
  }
  const payload = {
    name: name.value.trim(),
    sku: sku.value.trim(),
    category: category.value,
    description: description.value.trim() || undefined,
    price: Number(price.value),
    stock: Number(stock.value),
    status: status.value,
    images: images.value.filter((i) => i.url.trim()).map((i, idx) => ({ ...i, sortOrder: idx })),
    variants: variants.value.filter((v) => v.sku.trim()).map((v) => ({ ...v, price: Number(v.price) || 0, stock: Number(v.stock) || 0 })),
  }
  console.log('Submit product:', payload)
  toast.success(isEditMode.value ? t('products.form.updated') : t('products.form.created'))
  router.push({ name: 'ProductList' })
}

function goBack() {
  router.push({ name: 'ProductList' })
}

onMounted(() => {
  const id = route.query.id
  if (id && typeof id === 'string') {
    const detail = getProductDetail(id)
    if (detail) {
      name.value = detail.name
      sku.value = detail.sku
      category.value = detail.category
      description.value = detail.description ?? ''
      price.value = String(detail.price)
      stock.value = String(detail.stock)
      status.value = detail.status
      if (detail.images?.length) {
        images.value = detail.images.map((img, i) => ({
          id: img.id,
          url: img.url,
          alt: img.alt ?? '',
          sortOrder: i,
        }))
      }
      if (detail.variants?.length) {
        variants.value = detail.variants.map((v) => {
          const [attrKey, attrValue] = Object.entries(v.attributes)[0] ?? ['', '']
          return {
            id: v.id,
            sku: v.sku,
            name: v.name,
            attrKey,
            attrValue,
            price: String(v.price),
            stock: String(v.stock),
            status: v.status,
          }
        })
      }
    }
  } else if (!variants.value.length) {
    images.value = [{ id: nextId(), url: '', alt: '', sortOrder: 0 }]
  }
})

watch(
  () => images.value.length,
  (len) => {
    if (len === 0) images.value = [{ id: nextId(), url: '', alt: '', sortOrder: 0 }]
  }
)
</script>

<template>
  <div class="product-add-page animate__animated animate__fadeIn">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'ProductList' }">{{ t('nav.productList') }}</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ isEditMode ? t('products.form.editProduct') : t('products.form.addProduct') }}
        </li>
      </ol>
    </nav>

    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
      <div>
        <h1 class="h4 mb-1">{{ isEditMode ? t('products.form.editProduct') : t('products.form.addProduct') }}</h1>
        <p class="text-muted small mb-0">{{ isEditMode ? t('products.form.editSubtitle') : t('products.form.addSubtitle') }}</p>
      </div>
      <div class="d-flex gap-2">
        <button type="button" class="btn btn-outline-secondary" @click="goBack">
          <i class="bi bi-x-lg me-1"></i>{{ t('products.form.cancel') }}
        </button>
        <button type="button" class="btn btn-primary" @click="handleSubmit">
          <i class="bi bi-check-lg me-1"></i>{{ isEditMode ? t('common.save') : t('products.form.create') }}
        </button>
      </div>
    </div>

    <form class="product-form" @submit.prevent="handleSubmit">
      <div class="row g-4">
        <div class="col-lg-8">
          <!-- Thông tin cơ bản -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-bottom py-3">
              <h5 class="mb-0"><i class="bi bi-info-circle me-2"></i>{{ t('products.basicInfo') }}</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label">{{ t('products.productName') }} <span class="text-danger">*</span></label>
                <input
                  v-model="name"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.name }"
                  :placeholder="t('products.form.namePlaceholder')"
                  maxlength="200"
                />
                <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">{{ t('products.sku') }} <span class="text-danger">*</span></label>
                  <input
                    v-model="sku"
                    type="text"
                    class="form-control font-monospace"
                    :class="{ 'is-invalid': errors.sku }"
                    :placeholder="t('products.form.skuPlaceholder')"
                    maxlength="50"
                  />
                  <div v-if="errors.sku" class="invalid-feedback">{{ errors.sku }}</div>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">{{ t('products.category') }} <span class="text-danger">*</span></label>
                  <select v-model="category" class="form-select" :class="{ 'is-invalid': errors.category }">
                    <option value="" disabled>{{ t('products.allCategories') }}</option>
                    <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
                  </select>
                  <div v-if="errors.category" class="invalid-feedback">{{ errors.category }}</div>
                </div>
              </div>
              <div class="mb-0">
                <label class="form-label">{{ t('products.form.description') }}</label>
                <RichTextEditor
                  v-model="description"
                  :placeholder="t('products.form.descriptionPlaceholder')"
                  :height="280"
                  :min-height="160"
                />
                <div class="form-text mt-1">{{ (description?.length ?? 0) }} {{ t('products.form.characters') }}</div>
              </div>
            </div>
          </div>

          <!-- Giá & Tồn kho -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-bottom py-3">
              <h5 class="mb-0"><i class="bi bi-currency-dollar me-2"></i>{{ t('products.form.pricingInventory') }}</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label class="form-label">{{ t('products.price') }} (VND) <span class="text-danger">*</span></label>
                  <input
                    v-model="price"
                    type="number"
                    min="0"
                    step="1000"
                    class="form-control"
                    :class="{ 'is-invalid': errors.price }"
                    :placeholder="t('products.form.pricePlaceholder')"
                  />
                  <div v-if="errors.price" class="invalid-feedback">{{ errors.price }}</div>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">{{ t('products.stock') }} <span class="text-danger">*</span></label>
                  <input
                    v-model="stock"
                    type="number"
                    min="0"
                    step="1"
                    class="form-control"
                    :class="{ 'is-invalid': errors.stock }"
                    :placeholder="t('products.form.stockPlaceholder')"
                  />
                  <div v-if="errors.stock" class="invalid-feedback">{{ errors.stock }}</div>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">{{ t('products.status') }}</label>
                  <select v-model="status" class="form-select">
                    <option value="in_stock">{{ t('products.statusInStock') }}</option>
                    <option value="out_of_stock">{{ t('products.statusOutOfStock') }}</option>
                    <option value="discontinued">{{ t('products.statusDiscontinued') }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Hình ảnh -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-bottom py-3 d-flex align-items-center justify-content-between">
              <h5 class="mb-0"><i class="bi bi-images me-2"></i>{{ t('products.images') }}</h5>
              <button type="button" class="btn btn-sm btn-outline-primary" @click="addImage">
                <i class="bi bi-plus me-1"></i>{{ t('products.form.addImage') }}
              </button>
            </div>
            <div class="card-body">
              <div v-for="(img, idx) in images" :key="img.id" class="image-row row g-2 align-items-start mb-3 p-2 rounded border border-light">
                <div class="col-auto">
                  <div class="image-preview rounded bg-light overflow-hidden d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                    <img v-if="img.url" :src="img.url" :alt="img.alt" class="w-100 h-100 object-fit-cover" @error="($event.target as HTMLImageElement).style.display='none'" />
                    <i v-else class="bi bi-image text-muted fs-2"></i>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-2">
                    <input
                      type="file"
                      accept="image/*"
                      class="form-control form-control-sm"
                      :aria-label="t('products.form.uploadImage')"
                      @change="(e: Event) => onImageFileSelect(e, idx)"
                    />
                  </div>
                  <input v-model="img.url" type="url" class="form-control form-control-sm mb-2" :placeholder="t('products.form.imageUrlPlaceholder')" />
                  <input v-model="img.alt" type="text" class="form-control form-control-sm" :placeholder="t('products.form.imageAltPlaceholder')" />
                </div>
                <div class="col-auto">
                  <button type="button" class="btn btn-sm btn-outline-danger" :title="t('products.form.remove')" @click="removeImage(idx)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Biến thể -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-bottom py-3 d-flex align-items-center justify-content-between">
              <h5 class="mb-0"><i class="bi bi-collection me-2"></i>{{ t('products.variants') }}</h5>
              <button type="button" class="btn btn-sm btn-outline-primary" @click="addVariant">
                <i class="bi bi-plus me-1"></i>{{ t('products.form.addVariant') }}
              </button>
            </div>
            <div class="card-body">
              <div v-if="!variants.length" class="text-muted small py-2">{{ t('products.form.noVariantsHint') }}</div>
              <div v-else class="table-responsive">
                <table class="table table-bordered align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th>{{ t('products.sku') }}</th>
                      <th>{{ t('products.variantName') }}</th>
                      <th>{{ t('products.form.attrKey') }}</th>
                      <th>{{ t('products.form.attrValue') }}</th>
                      <th>{{ t('products.price') }}</th>
                      <th>{{ t('products.stock') }}</th>
                      <th>{{ t('products.status') }}</th>
                      <th style="width: 44px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, idx) in variants" :key="v.id">
                      <td><input v-model="v.sku" type="text" class="form-control form-control-sm font-monospace" placeholder="SKU" /></td>
                      <td><input v-model="v.name" type="text" class="form-control form-control-sm" :placeholder="t('products.form.variantNamePlaceholder')" /></td>
                      <td><input v-model="v.attrKey" type="text" class="form-control form-control-sm" placeholder="Màu" /></td>
                      <td><input v-model="v.attrValue" type="text" class="form-control form-control-sm" placeholder="Đen" /></td>
                      <td><input v-model="v.price" type="number" min="0" class="form-control form-control-sm" /></td>
                      <td><input v-model="v.stock" type="number" min="0" class="form-control form-control-sm" /></td>
                      <td>
                        <select v-model="v.status" class="form-select form-select-sm">
                          <option value="in_stock">{{ t('products.statusInStock') }}</option>
                          <option value="out_of_stock">{{ t('products.statusOutOfStock') }}</option>
                          <option value="discontinued">{{ t('products.statusDiscontinued') }}</option>
                        </select>
                      </td>
                      <td>
                        <button type="button" class="btn btn-sm btn-link text-danger p-0" :title="t('products.form.remove')" @click="removeVariant(idx)">
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Cột phải: Tóm tắt -->
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm sticky-top" style="top: 1rem;">
            <div class="card-header bg-transparent border-bottom py-3">
              <h5 class="mb-0"><i class="bi bi-card-text me-2"></i>{{ t('products.form.summary') }}</h5>
            </div>
            <div class="card-body">
              <dl class="mb-0 small">
                <dt class="text-muted">{{ t('products.productName') }}</dt>
                <dd class="mb-2">{{ name || '—' }}</dd>
                <dt class="text-muted">{{ t('products.sku') }}</dt>
                <dd class="mb-2 font-monospace">{{ sku || '—' }}</dd>
                <dt class="text-muted">{{ t('products.category') }}</dt>
                <dd class="mb-2">{{ category || '—' }}</dd>
                <dt class="text-muted">{{ t('products.price') }}</dt>
                <dd class="mb-2 fw-semibold text-primary">{{ price ? formatPrice(Number(price)) : '—' }}</dd>
                <dt class="text-muted">{{ t('products.stock') }}</dt>
                <dd class="mb-2">{{ stock !== '' ? stock : '—' }}</dd>
                <dt class="text-muted">{{ t('products.status') }}</dt>
                <dd class="mb-2">{{ summaryStatusLabel }}</dd>
                <dt class="text-muted">{{ t('products.images') }}</dt>
                <dd class="mb-2">{{ images.filter((i) => i.url.trim()).length }} {{ t('products.form.imagesCount') }}</dd>
                <dt class="text-muted">{{ t('products.variants') }}</dt>
                <dd class="mb-0">{{ variants.filter((v) => v.sku.trim()).length }} {{ t('products.form.variantsCount') }}</dd>
              </dl>
              <hr />
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-check-lg me-1"></i>{{ isEditMode ? t('common.save') : t('products.form.create') }}
                </button>
                <button type="button" class="btn btn-outline-secondary" @click="goBack">{{ t('products.form.cancel') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.product-form .card-header h5 {
  font-size: 1rem;
  font-weight: 600;
}
.sticky-top {
  position: sticky;
}
</style>
