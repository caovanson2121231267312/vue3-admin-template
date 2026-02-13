<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'info' | 'success' | 'warning' | 'danger'
    title?: string
  }>(),
  { variant: 'info' }
)
</script>

<template>
  <div class="admin-callout" :class="`admin-callout--${variant}`">
    <h5 v-if="title" class="admin-callout__title">{{ title }}</h5>
    <slot></slot>
  </div>
</template>

<style scoped>
.admin-callout {
  padding: 1rem 1rem 1rem 2rem;
  margin: 0 0 1rem 0;
  border-left: 4px solid;
  border-radius: 0 0.25rem 0.25rem 0;
}
.admin-callout__title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}
.admin-callout--info { border-color: #0dcaf0; background: rgba(13, 202, 240, 0.08); }
.admin-callout--success { border-color: #198754; background: rgba(25, 135, 84, 0.08); }
.admin-callout--warning { border-color: #ffc107; background: rgba(255, 193, 7, 0.08); }
.admin-callout--danger { border-color: #dc3545; background: rgba(220, 53, 69, 0.08); }
</style>
