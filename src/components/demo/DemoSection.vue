<script setup lang="ts">
import DemoCodeBlock from './DemoCodeBlock.vue'

defineProps<{
  title: string
  description?: string
  code?: string
  codeLanguage?: string
}>()
</script>

<template>
  <section class="demo-section mb-5">
    <h2 class="h5 mb-2">{{ title }}</h2>
    <p v-if="description" class="text-muted small mb-3">{{ description }}</p>
    <div class="demo-section__preview mb-3 p-3 rounded border bg-white">
      <slot></slot>
    </div>
    <DemoCodeBlock v-if="code" :code="code" :language="codeLanguage" />
  </section>
</template>

<style scoped>
.demo-section__preview {
  min-height: 60px;
}
</style>
