<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    variant?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'outline-primary' | 'outline-success' | 'outline-danger'
    collapsible?: boolean
    removable?: boolean
    loading?: boolean
  }>(),
  { variant: 'default', collapsible: false, removable: false, loading: false }
)

const collapsed = defineModel<boolean>('collapsed', { default: false })
</script>

<template>
  <div class="card admin-card" :class="[variant !== 'default' && `admin-card--${variant}`]">
    <div v-if="title || collapsible || removable" class="card-header d-flex align-items-center">
      <h5 v-if="title" class="card-title mb-0 flex-grow-1">{{ title }}</h5>
      <div class="card-tools ms-auto d-flex gap-1">
        <button
          v-if="collapsible"
          type="button"
          class="btn btn-tool btn-sm"
          :aria-expanded="!collapsed"
          @click="collapsed = !collapsed"
        >
          <i class="bi" :class="collapsed ? 'bi-chevron-down' : 'bi-chevron-up'"></i>
        </button>
        <button v-if="removable" type="button" class="btn btn-tool btn-sm" aria-label="Đóng">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
    <div v-show="!collapsed" class="card-body">
      <div v-if="loading" class="text-center py-4">
        <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Đang tải...</span></div>
      </div>
      <template v-else>
        <slot></slot>
      </template>
    </div>
  </div>
</template>

<style scoped>
.admin-card--primary .card-header { background: rgba(13, 110, 253, 0.15); color: #0d6efd; }
.admin-card--success .card-header { background: rgba(25, 135, 84, 0.15); color: #198754; }
.admin-card--info .card-header { background: rgba(13, 202, 240, 0.15); color: #0dcaf0; }
.admin-card--warning .card-header { background: rgba(255, 193, 7, 0.15); color: #d39e00; }
.admin-card--danger .card-header { background: rgba(220, 53, 69, 0.15); color: #dc3545; }
.admin-card--outline-primary .card { border-color: #0d6efd; }
.admin-card--outline-primary .card-header { border-bottom-color: #0d6efd; background: transparent; color: #0d6efd; }
.admin-card--outline-success .card { border-color: #198754; }
.admin-card--outline-success .card-header { border-bottom-color: #198754; background: transparent; color: #198754; }
.admin-card--outline-danger .card { border-color: #dc3545; }
.admin-card--outline-danger .card-header { border-bottom-color: #dc3545; background: transparent; color: #dc3545; }
.btn-tool {
  padding: 0.25rem 0.5rem;
  color: inherit;
  opacity: 0.7;
}
.btn-tool:hover {
  opacity: 1;
}
</style>
