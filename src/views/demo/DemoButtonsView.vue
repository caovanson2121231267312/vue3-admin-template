<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DemoSection from '../../components/demo/DemoSection.vue'

const { t } = useI18n()

const codeVariants = `<div class="d-flex flex-wrap gap-2">
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-secondary">Secondary</button>
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-warning text-dark">Warning</button>
  <button type="button" class="btn btn-info text-dark">Info</button>
  <button type="button" class="btn btn-light">Light</button>
  <button type="button" class="btn btn-dark">Dark</button>
</div>`

const codeOutline = `<div class="d-flex flex-wrap gap-2">
  <button type="button" class="btn btn-outline-primary">Primary</button>
  <button type="button" class="btn btn-outline-secondary">Secondary</button>
  <button type="button" class="btn btn-outline-success">Success</button>
  <button type="button" class="btn btn-outline-danger">Danger</button>
</div>`

const codeSizes = `<button type="button" class="btn btn-primary btn-lg">Large</button>
<button type="button" class="btn btn-primary">Default</button>
<button type="button" class="btn btn-primary btn-sm">Small</button>`

const codeIcons = `<button type="button" class="btn btn-primary">
  <i class="bi bi-plus-lg me-1"></i> Thêm mới
</button>
<button type="button" class="btn btn-success">
  <i class="bi bi-check-lg me-1"></i> Lưu
</button>
<button type="button" class="btn btn-danger">
  <i class="bi bi-trash me-1"></i> Xóa
</button>`

const codeDisabled = `<button type="button" class="btn btn-primary" disabled>Primary disabled</button>
<button type="button" class="btn btn-outline-secondary" disabled>Outline disabled</button>`

const codeGroup = `<div class="btn-group" role="group">
  <button type="button" class="btn btn-outline-primary">Trái</button>
  <button type="button" class="btn btn-outline-primary active">Giữa</button>
  <button type="button" class="btn btn-outline-primary">Phải</button>
</div>`

const codeBlock = `<div class="d-grid gap-2">
  <button type="button" class="btn btn-primary">Nút full width</button>
  <button type="button" class="btn btn-outline-secondary">Nút full width 2</button>
</div>`

const codeLink = `<a href="#" class="btn btn-primary">Link Primary</a>
<a href="#" class="btn btn-outline-success">Link Success</a>`
</script>

<template>
  <div class="demo-page animate__animated animate__fadeIn">
    <h1 class="h3 mb-2">{{ t('demo.buttonsTitle') }}</h1>
    <p class="text-muted mb-4" v-html="t('demo.buttonsSubtitle').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></p>

    <DemoSection
      :title="t('demo.variants')"
      :description="t('demo.variantsDesc')"
      :code="codeVariants"
      code-language="html"
    >
      <div class="d-flex flex-wrap gap-2">
        <button type="button" class="btn btn-primary">Primary</button>
        <button type="button" class="btn btn-secondary">Secondary</button>
        <button type="button" class="btn btn-success">Success</button>
        <button type="button" class="btn btn-danger">Danger</button>
        <button type="button" class="btn btn-warning text-dark">Warning</button>
        <button type="button" class="btn btn-info text-dark">Info</button>
        <button type="button" class="btn btn-light">Light</button>
        <button type="button" class="btn btn-dark">Dark</button>
      </div>
    </DemoSection>

    <DemoSection
      :title="t('demo.outline')"
      :description="t('demo.outlineDesc')"
      :code="codeOutline"
      code-language="html"
    >
      <div class="d-flex flex-wrap gap-2">
        <button type="button" class="btn btn-outline-primary">Primary</button>
        <button type="button" class="btn btn-outline-secondary">Secondary</button>
        <button type="button" class="btn btn-outline-success">Success</button>
        <button type="button" class="btn btn-outline-danger">Danger</button>
        <button type="button" class="btn btn-outline-warning">Warning</button>
        <button type="button" class="btn btn-outline-info">Info</button>
        <button type="button" class="btn btn-outline-dark">Dark</button>
      </div>
    </DemoSection>

    <DemoSection
      :title="t('demo.sizes')"
      :description="t('demo.sizesDesc')"
      :code="codeSizes"
      code-language="html"
    >
      <div class="d-flex flex-wrap align-items-center gap-2">
        <button type="button" class="btn btn-primary btn-lg">Large</button>
        <button type="button" class="btn btn-primary">Default</button>
        <button type="button" class="btn btn-primary btn-sm">Small</button>
      </div>
    </DemoSection>

    <DemoSection
      :title="t('demo.withIcons')"
      :description="t('demo.withIconsDesc')"
      :code="codeIcons"
      code-language="html"
    >
      <div class="d-flex flex-wrap gap-2">
        <button type="button" class="btn btn-primary">
          <i class="bi bi-plus-lg me-1"></i> {{ t('demo.addNew') }}
        </button>
        <button type="button" class="btn btn-success">
          <i class="bi bi-check-lg me-1"></i> {{ t('common.save') }}
        </button>
        <button type="button" class="btn btn-danger">
          <i class="bi bi-trash me-1"></i> {{ t('common.delete') }}
        </button>
        <button type="button" class="btn btn-outline-secondary">
          <i class="bi bi-download me-1"></i> {{ t('demo.download') }}
        </button>
        <button type="button" class="btn btn-outline-primary btn-sm">
          <i class="bi bi-pencil"></i>
        </button>
      </div>
    </DemoSection>

    <DemoSection
      :title="t('demo.disabled')"
      :description="t('demo.disabledDesc')"
      :code="codeDisabled"
      code-language="html"
    >
      <div class="d-flex flex-wrap gap-2">
        <button type="button" class="btn btn-primary" disabled>{{ t('demo.primaryDisabled') }}</button>
        <button type="button" class="btn btn-outline-secondary" disabled>{{ t('demo.outlineDisabled') }}</button>
        <a href="#" class="btn btn-primary disabled" tabindex="-1" aria-disabled="true">{{ t('demo.linkDisabled') }}</a>
      </div>
    </DemoSection>

    <DemoSection
      :title="t('demo.buttonGroup')"
      :description="t('demo.buttonGroupDesc')"
      :code="codeGroup"
      code-language="html"
    >
      <div class="d-flex flex-wrap gap-3">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-outline-primary">{{ t('demo.left') }}</button>
          <button type="button" class="btn btn-outline-primary active">{{ t('demo.center') }}</button>
          <button type="button" class="btn btn-outline-primary">{{ t('demo.right') }}</button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-primary btn-sm"><i class="bi bi-list-ul"></i></button>
          <button type="button" class="btn btn-outline-primary btn-sm"><i class="bi bi-grid-3x3-gap"></i></button>
        </div>
      </div>
    </DemoSection>

    <DemoSection
      :title="t('demo.fullWidth')"
      :description="t('demo.fullWidthDesc')"
      :code="codeBlock"
      code-language="html"
    >
      <div class="d-grid gap-2" style="max-width: 300px;">
        <button type="button" class="btn btn-primary">{{ t('demo.fullWidth') }}</button>
        <button type="button" class="btn btn-outline-secondary">{{ t('demo.fullWidth') }} 2</button>
      </div>
    </DemoSection>

    <DemoSection
      :title="t('demo.linkAsButton')"
      :description="t('demo.linkAsButtonDesc')"
      :code="codeLink"
      code-language="html"
    >
      <div class="d-flex flex-wrap gap-2">
        <a href="#" class="btn btn-primary">Link Primary</a>
        <a href="#" class="btn btn-outline-success">Link Success</a>
      </div>
    </DemoSection>
  </div>
</template>

<style scoped>
.demo-page :deep(.btn) {
  text-decoration: none;
}
</style>
