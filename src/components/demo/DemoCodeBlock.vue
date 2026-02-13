<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

const props = defineProps<{
  code: string
  language?: string
}>()

const { t } = useI18n()
const copied = ref(false)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    toast.success(t('demo.copySuccess'))
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    toast.error(t('demo.copyError'))
  }
}
</script>

<template>
  <div class="demo-code-block position-relative rounded border bg-light">
    <div class="demo-code-block__toolbar d-flex align-items-center justify-content-between px-2 py-1 border-bottom bg-white rounded-top">
      <span class="small text-muted">{{ language ?? 'html' }}</span>
      <button
        type="button"
        class="btn btn-sm btn-outline-secondary py-0 px-2"
        :class="{ 'btn-success': copied }"
        @click="copyCode"
      >
        <i class="bi me-1" :class="copied ? 'bi-check-lg' : 'bi-clipboard'"></i>
        {{ copied ? t('demo.copied') : t('demo.copy') }}
      </button>
    </div>
    <pre class="demo-code-block__pre mb-0 p-3 small overflow-auto"><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.demo-code-block__pre {
  max-height: 320px;
  font-size: 0.8rem;
  line-height: 1.4;
}
.demo-code-block__pre code {
  color: #24292f;
  white-space: pre;
}
</style>
