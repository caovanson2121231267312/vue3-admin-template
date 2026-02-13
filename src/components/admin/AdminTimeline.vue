<script setup lang="ts">
defineProps<{
  items: Array<{
    time?: string
    icon?: string
    variant?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
    title?: string
  }>
}>()
</script>

<template>
  <div class="admin-timeline">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="admin-timeline__item d-flex"
    >
      <div class="admin-timeline__icon flex-shrink-0 rounded-circle" :class="`bg-${item.variant ?? 'primary'}`">
        <i :class="item.icon ?? 'bi bi-circle-fill'"></i>
      </div>
      <div class="admin-timeline__content flex-grow-1 ms-3 pb-4">
        <div v-if="item.time" class="small text-muted">{{ item.time }}</div>
        <div v-if="item.title" class="fw-semibold">{{ item.title }}</div>
        <slot name="item" :item="item" :index="i">
          <div v-if="item.title" class="small text-muted mt-1"><slot :name="`item-${i}`"></slot></div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-timeline__icon {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.75rem;
}
.admin-timeline__item:not(:last-child) .admin-timeline__content {
  border-left: 2px solid #dee2e6;
  margin-left: calc(1rem - 1px);
  padding-left: 1rem;
}
</style>
