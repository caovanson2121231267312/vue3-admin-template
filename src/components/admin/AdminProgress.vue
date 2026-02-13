<script setup lang="ts">
withDefaults(
  defineProps<{
    value: number
    variant?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
    striped?: boolean
    animated?: boolean
    height?: string
    showLabel?: boolean
  }>(),
  { variant: 'primary', striped: false, animated: false, height: '1.25rem', showLabel: true }
)
</script>

<template>
  <div class="progress" :style="{ height }">
    <div
      class="progress-bar"
      :class="[
        `bg-${variant}`,
        striped && 'progress-bar-striped',
        animated && 'progress-bar-animated'
      ]"
      role="progressbar"
      :style="{ width: `${Math.min(100, Math.max(0, value))}%` }"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span v-if="showLabel" class="progress-bar-label">{{ value }}%</span>
    </div>
  </div>
</template>

<style scoped>
.progress-bar-label {
  font-size: 0.75rem;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
}
</style>
