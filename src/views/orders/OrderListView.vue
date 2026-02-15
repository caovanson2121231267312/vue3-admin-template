<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { Order, OrderStatus } from '../../types/order'
import { mockOrders } from './data/orders-mock'

const router = useRouter()
const { t } = useI18n()

const statusFilter = ref<OrderStatus | ''>('')
const search = ref('')

const filteredOrders = computed(() => {
  let list: Order[] = [...mockOrders]
  const k = search.value.trim().toLowerCase()
  if (k) {
    list = list.filter(
      (o) =>
        o.code.toLowerCase().includes(k) ||
        o.customerName.toLowerCase().includes(k)
    )
  }
  if (statusFilter.value) {
    list = list.filter((o) => o.status === statusFilter.value)
  }
  return list
})

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

function goDetail(id: string) {
  router.push({ name: 'OrderDetail', params: { id } })
}
function goCreate() {
  router.push({ name: 'OrderCreate' })
}
</script>

<template>
  <div class="order-list-page animate__animated animate__fadeIn">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
      <div>
        <h1 class="h3 mb-1">{{ t('orders.title') }}</h1>
        <p class="text-muted small mb-0">{{ t('orders.subtitle') }}</p>
      </div>
      <button type="button" class="btn btn-primary" @click="goCreate">
        <i class="bi bi-plus-lg me-1"></i>{{ t('nav.createOrder') }}
      </button>
    </div>

    <div class="card border-0 shadow-sm mb-3">
      <div class="card-body py-2 px-3">
        <div class="row g-2 align-items-center">
          <div class="col-auto">
            <input
              v-model="search"
              type="text"
              class="form-control form-control-sm"
              :placeholder="t('orders.searchPlaceholder')"
              style="min-width: 200px"
            />
          </div>
          <div class="col-auto">
            <select v-model="statusFilter" class="form-select form-select-sm" style="min-width: 140px">
              <option value="">{{ t('orders.allStatuses') }}</option>
              <option value="pending">{{ t('orders.statusPending') }}</option>
              <option value="confirmed">{{ t('orders.statusConfirmed') }}</option>
              <option value="processing">{{ t('orders.statusProcessing') }}</option>
              <option value="shipping">{{ t('orders.statusShipping') }}</option>
              <option value="delivered">{{ t('orders.statusDelivered') }}</option>
              <option value="cancelled">{{ t('orders.statusCancelled') }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>{{ t('orders.code') }}</th>
              <th>{{ t('orders.customer') }}</th>
              <th>{{ t('orders.date') }}</th>
              <th>{{ t('orders.items') }}</th>
              <th>{{ t('orders.total') }}</th>
              <th>{{ t('orders.status') }}</th>
              <th class="text-end">{{ t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!filteredOrders.length">
              <td colspan="7" class="text-center text-muted py-4">{{ t('orders.noOrders') }}</td>
            </tr>
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              class="align-middle"
            >
              <td>
                <router-link :to="{ name: 'OrderDetail', params: { id: order.id } }" class="fw-semibold text-decoration-none">
                  {{ order.code }}
                </router-link>
              </td>
              <td>{{ order.customerName }}</td>
              <td>{{ order.createdAt }}</td>
              <td>{{ order.itemCount }}</td>
              <td>{{ formatPrice(order.totalAmount) }}</td>
              <td>
                <span class="badge" :class="getStatusClass(order.status)">{{ getStatusLabel(order.status) }}</span>
              </td>
              <td class="text-end">
                <router-link :to="{ name: 'OrderDetail', params: { id: order.id } }" class="btn btn-sm btn-outline-primary">
                  <i class="bi bi-eye me-1"></i>{{ t('common.view') }}
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
