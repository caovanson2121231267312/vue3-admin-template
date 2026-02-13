<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'secondary'
    dismissible?: boolean
    title?: string
  }>(),
  { variant: 'info', dismissible: false }
)

const visible = defineModel<boolean>('visible', { default: true })
</script>

<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="alert d-flex align-items-start"
      :class="[`alert-${variant}`, dismissible && 'alert-dismissible']"
      role="alert"
    >
      <div class="flex-grow-1">
        <h6 v-if="title" class="alert-heading mb-1">{{ title }}</h6>
        <slot></slot>
      </div>
      <button
        v-if="dismissible"
        type="button"
        class="btn-close"
        aria-label="Đóng"
        @click="visible = false"
      ></button>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
