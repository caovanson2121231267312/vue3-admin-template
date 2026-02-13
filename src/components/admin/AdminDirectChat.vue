<script setup lang="ts">
defineProps<{
  title?: string
  status?: string
}>()
</script>

<template>
  <div class="card admin-direct-chat">
    <div class="card-header d-flex align-items-center">
      <h5 class="card-title mb-0 flex-grow-1">{{ title ?? 'Chat' }}</h5>
      <span v-if="status" class="badge bg-success small">{{ status }}</span>
    </div>
    <div class="card-body p-0" style="height: 250px; overflow-y: auto;">
      <slot></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.admin-direct-chat .card-footer {
  padding: 0.5rem;
}
</style>
