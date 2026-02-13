<script setup lang="ts">
withDefaults(
  defineProps<{
    striped?: boolean
    hover?: boolean
    bordered?: boolean
    small?: boolean
  }>(),
  { striped: false, hover: true, bordered: false, small: false }
)
</script>

<template>
  <div class="table-responsive">
    <table
      class="table mb-0"
      :class="{
        'table-striped': striped,
        'table-hover': hover,
        'table-bordered': bordered,
        'table-sm': small,
      }"
    >
      <slot></slot>
    </table>
  </div>
</template>
