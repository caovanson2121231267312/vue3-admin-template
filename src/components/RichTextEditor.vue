<script setup lang="ts">
import { ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = withDefaults(
  defineProps<{
    modelValue?: string | null
    placeholder?: string
    height?: number
    minHeight?: number
  }>(),
  { modelValue: '', placeholder: '', height: 280, minHeight: 120 }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editorRef = ref<InstanceType<typeof QuillEditor> | null>(null)
const content = ref(props.modelValue ?? '')

watch(
  () => props.modelValue,
  (val) => {
    const v = val ?? ''
    if (v !== content.value) content.value = v
  },
  { immediate: true }
)

watch(content, (val) => {
  emit('update:modelValue', val ?? '')
})

function onEditorReady() {
  const quill = editorRef.value?.getQuill?.()
  if (!quill) return
  const toolbar = quill.getModule('toolbar')
  if (!toolbar) return
  toolbar.addHandler('image', imageHandler)
}

function imageHandler() {
  const q = editorRef.value?.getQuill?.()
  if (!q) return
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.click()
  input.onchange = () => {
    const file = input.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const url = (e.target?.result as string) ?? ''
      const range = q.getSelection(true)
      if (range) {
        q.insertEmbed(range.index, 'image', url)
        q.setSelection(range.index + 1)
      }
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <div class="rich-text-editor-wrapper">
    <QuillEditor
      ref="editorRef"
      v-model:content="content"
      content-type="html"
      :placeholder="placeholder"
      theme="snow"
      :options="{ readOnly: false }"
      :style="{ minHeight: minHeight + 'px' }"
      @ready="onEditorReady"
    />
  </div>
</template>

<style scoped>
.rich-text-editor-wrapper :deep(.quill) {
  border: 1px solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  background: var(--bs-body-bg);
}
.rich-text-editor-wrapper :deep(.ql-toolbar) {
  border-bottom: 1px solid var(--bs-border-color);
  border-top-left-radius: var(--bs-border-radius);
  border-top-right-radius: var(--bs-border-radius);
}
.rich-text-editor-wrapper :deep(.ql-container) {
  border-bottom-left-radius: var(--bs-border-radius);
  border-bottom-right-radius: var(--bs-border-radius);
  min-height: v-bind(minHeight + 'px');
}
</style>
