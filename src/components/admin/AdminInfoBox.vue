<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    value?: string | number
    icon?: string
    variant?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'secondary'
    progress?: number
    progressText?: string
  }>(),
  { icon: 'bi bi-info-circle', variant: 'info' }
)
</script>

<template>
  <div class="admin-info-box border rounded p-3 d-flex">
    <div class="admin-info-box__icon rounded flex-shrink-0" :class="`admin-info-box__icon--${variant}`">
      <i :class="icon"></i>
    </div>
    <div class="admin-info-box__content flex-grow-1 ms-3 min-width-0">
      <span class="admin-info-box__title text-muted small text-uppercase">{{ title }}</span>
      <span v-if="value !== undefined" class="admin-info-box__value d-block fs-4 fw-bold">{{ value }}</span>
      <div v-if="progress !== undefined" class="progress mt-2" style="height: 6px;">
        <div
          class="progress-bar"
          :class="`bg-${variant}`"
          role="progressbar"
          :style="{ width: `${Math.min(100, Math.max(0, progress))}%` }"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <span v-if="progressText" class="small text-muted">{{ progressText }}</span>
    </div>
  </div>
</template>

<style scoped>
.admin-info-box__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
.admin-info-box__icon--primary { background: rgba(13, 110, 253, 0.15); color: #0d6efd; }
.admin-info-box__icon--success { background: rgba(25, 135, 84, 0.15); color: #198754; }
.admin-info-box__icon--info { background: rgba(13, 202, 240, 0.15); color: #0dcaf0; }
.admin-info-box__icon--warning { background: rgba(255, 193, 7, 0.15); color: #d39e00; }
.admin-info-box__icon--danger { background: rgba(220, 53, 69, 0.15); color: #dc3545; }
.admin-info-box__icon--secondary { background: rgba(108, 117, 125, 0.15); color: #6c757d; }
</style>
