<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'light' | 'dark'
    rounded?: boolean
  }>(),
  { variant: 'primary', rounded: false }
)
</script>

<template>
  <span class="badge" :class="[`bg-${variant}`, rounded && 'rounded-pill']">
    <slot></slot>
  </span>
</template>
