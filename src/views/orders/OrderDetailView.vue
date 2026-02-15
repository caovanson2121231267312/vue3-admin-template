<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { OrderDetail, OrderStatus } from '../../types/order'
import { getOrderDetail } from './data/order-detail-mock'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const orderId = computed(() => String(route.params.id ?? ''))
const order = ref<OrderDetail | null>(null)

const statusLabels = computed<Record<OrderStatus, string>>(() => ({
  pending: t('orders.statusPending'),
  confirmed: t('orders.statusConfirmed'),
  processing: t('orders.statusProcessing'),
  shipping: t('orders.statusShipping'),
  delivered: t('orders.statusDelivered'),
  cancelled: t('orders.statusCancelled'),
}))

const statusClass: Record<OrderStatus, string> = {
  pending: 'bg-warning text-dark',
  confirmed: 'bg-info',
  processing: 'bg-primary',
  shipping: 'bg-info',
  delivered: 'bg-success',
  cancelled: 'bg-secondary',
}

function getStatusLabel(s: OrderStatus) {
  return statusLabels.value[s] ?? s
}
function getStatusClass(s: OrderStatus) {
  return statusClass[s] ?? 'bg-secondary'
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)
}

const paymentMethodLabel = computed(() => {
  const map: Record<string, string> = {
    cod: t('orders.paymentCOD'),
    bank_transfer: t('orders.paymentBank'),
    momo: t('orders.paymentMomo'),
  }
  return order.value?.paymentMethod ? (map[order.value.paymentMethod] ?? order.value.paymentMethod) : '—'
})

watch(
  orderId,
  (id) => {
    order.value = id ? getOrderDetail(id) ?? null : null
  },
  { immediate: true }
)

function goBack() {
  router.push({ name: 'OrderList' })
}
function goEdit() {
  router.push({ name: 'OrderCreate', query: { id: orderId.value } })
}
</script>

<template>
  <div class="order-detail-page animate__animated animate__fadeIn">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'OrderList' }">{{ t('nav.orderList') }}</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ (order?.code) ?? (orderId || t('orders.detailTitle')) }}
        </li>
      </ol>
    </nav>

    <div v-if="!order" class="alert alert-warning">
      {{ t('orders.orderNotFound') }}
      <button type="button" class="btn btn-sm btn-outline-primary ms-2" @click="goBack">
        {{ t('orders.backToList') }}
      </button>
    </div>

    <template v-else>
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
        <h1 class="h4 mb-0">{{ order.code }} — {{ order.customerName }}</h1>
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-outline-secondary" @click="goBack">
            <i class="bi bi-arrow-left me-1"></i>{{ t('orders.backToList') }}
          </button>
          <button type="button" class="btn btn-primary" @click="goEdit">
            <i class="bi bi-pencil me-1"></i>{{ t('common.edit') }}
          </button>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-8">
          <!-- Thông tin đơn -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-bottom py-3">
              <h5 class="mb-0"><i class="bi bi-receipt me-2"></i>{{ t('orders.orderInfo') }}</h5>
            </div>
            <div class="card-body">
              <dl class="row mb-0">
                <dt class="col-sm-3">{{ t('orders.code') }}</dt>
                <dd class="col-sm-9"><code>{{ order.code }}</code></dd>
                <dt class="col-sm-3">{{ t('orders.date') }}</dt>
                <dd class="col-sm-9">{{ order.createdAt }}</dd>
                <dt class="col-sm-3">{{ t('orders.status') }}</dt>
                <dd class="col-sm-9"><span class="badge" :class="getStatusClass(order.status)">{{ getStatusLabel(order.status) }}</span></dd>
                <dt class="col-sm-3">{{ t('orders.paymentMethod') }}</dt>
                <dd class="col-sm-9">{{ paymentMethodLabel }}</dd>
                <template v-if="order.note">
                  <dt class="col-sm-3">{{ t('orders.note') }}</dt>
                  <dd class="col-sm-9">{{ order.note }}</dd>
                </template>
              </dl>
            </div>
          </div>

          <!-- Sản phẩm -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-bottom py-3">
              <h5 class="mb-0"><i class="bi bi-cart me-2"></i>{{ t('orders.items') }} ({{ order.items.length }})</h5>
            </div>
            <div class="card-body p-0">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th>{{ t('orders.productName') }}</th>
                    <th>{{ t('orders.sku') }}</th>
                    <th class="text-center">{{ t('orders.quantity') }}</th>
                    <th class="text-end">{{ t('orders.unitPrice') }}</th>
                    <th class="text-end">{{ t('orders.total') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.items" :key="item.productId + item.sku">
                    <td>{{ item.productName }}</td>
                    <td><code class="small">{{ item.sku }}</code></td>
                    <td class="text-center">{{ item.quantity }}</td>
                    <td class="text-end">{{ formatPrice(item.unitPrice) }}</td>
                    <td class="text-end fw-semibold">{{ formatPrice(item.total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card-footer bg-transparent border-0 text-end">
              <span class="text-muted me-2">{{ t('orders.totalAmount') }}:</span>
              <span class="fs-5 fw-bold text-primary">{{ formatPrice(order.totalAmount) }}</span>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <!-- Khách hàng -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-transparent border-bottom py-3">
              <h5 class="mb-0"><i class="bi bi-person me-2"></i>{{ t('orders.customer') }}</h5>
            </div>
            <div class="card-body">
              <p class="mb-1 fw-semibold">{{ order.customer.fullName }}</p>
              <p class="mb-1 small"><i class="bi bi-envelope me-1"></i>{{ order.customer.email }}</p>
              <p class="mb-1 small"><i class="bi bi-telephone me-1"></i>{{ order.customer.phone }}</p>
              <p class="mb-0 small text-secondary">{{ order.customer.address }}</p>
              <template v-if="order.shippingAddress && order.shippingAddress !== order.customer.address">
                <hr />
                <p class="small mb-0"><strong>{{ t('orders.shippingAddress') }}:</strong><br />{{ order.shippingAddress }}</p>
              </template>
            </div>
          </div>

          <!-- Timeline -->
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-bottom py-3">
              <h5 class="mb-0"><i class="bi bi-clock-history me-2"></i>{{ t('orders.timeline') }}</h5>
            </div>
            <div class="card-body">
              <div class="order-timeline">
                <div
                  v-for="(entry, idx) in order.timeline"
                  :key="idx"
                  class="d-flex gap-2 mb-3"
                >
                  <div class="flex-shrink-0 mt-1">
                    <span class="badge rounded-pill" :class="getStatusClass(entry.status)" style="min-width: 24px; height: 24px;">&nbsp;</span>
                  </div>
                  <div class="flex-grow-1 small">
                    <span class="badge me-1" :class="getStatusClass(entry.status)">{{ getStatusLabel(entry.status) }}</span>
                    <span class="text-muted">{{ entry.at }}</span>
                    <p v-if="entry.note" class="mb-0 mt-1 text-secondary">{{ entry.note }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
