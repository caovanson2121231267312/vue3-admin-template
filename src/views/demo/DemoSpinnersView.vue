<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DemoSection from '../../components/demo/DemoSection.vue'

const { t } = useI18n()

const codeBasic = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Đang tải...</span>
</div>`

const codeVariants = `<div class="spinner-border text-primary" role="status"></div>
<div class="spinner-border text-success" role="status"></div>
<div class="spinner-border text-danger" role="status"></div>
<div class="spinner-border text-warning" role="status"></div>`

const codeGrow = `<div class="spinner-grow text-primary" role="status"></div>
<div class="spinner-grow text-success" role="status"></div>`

const codeSizes = `<div class="spinner-border spinner-border-sm text-primary" role="status"></div>
<div class="spinner-border text-primary" role="status"></div>
<div class="spinner-grow text-primary" style="width: 3rem; height: 3rem;" role="status"></div>`

const codeButton = `<button class="btn btn-primary" disabled>
  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
  Đang tải...
</button>`
</script>

<template>
  <div class="demo-page animate__animated animate__fadeIn">
    <h1 class="h3 mb-2">{{ t('demo.spinnersTitle') }}</h1>
    <p class="text-muted mb-4" v-html="t('demo.spinnersSubtitle').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></p>

    <DemoSection :title="t('demo.spinnerBasic')" :description="t('demo.spinnerBasicDesc')" :code="codeBasic" code-language="html">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ t('demo.loading') }}</span>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.spinnerVariants')" :description="t('demo.spinnerVariantsDesc')" :code="codeVariants" code-language="html">
      <div class="d-flex gap-3 align-items-center">
        <div class="spinner-border text-primary" role="status"></div>
        <div class="spinner-border text-success" role="status"></div>
        <div class="spinner-border text-danger" role="status"></div>
        <div class="spinner-border text-warning" role="status"></div>
        <div class="spinner-border text-secondary" role="status"></div>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.spinnerGrow')" :description="t('demo.spinnerGrowDesc')" :code="codeGrow" code-language="html">
      <div class="d-flex gap-3">
        <div class="spinner-grow text-primary" role="status"></div>
        <div class="spinner-grow text-success" role="status"></div>
        <div class="spinner-grow text-info" role="status"></div>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.spinnerSizes')" :description="t('demo.spinnerSizesDesc')" :code="codeSizes" code-language="html">
      <div class="d-flex gap-3 align-items-center">
        <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
        <div class="spinner-border text-primary" role="status"></div>
        <div class="spinner-grow text-primary" style="width: 3rem; height: 3rem;" role="status"></div>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.spinnerInButton')" :description="t('demo.spinnerInButtonDesc')" :code="codeButton" code-language="html">
      <button class="btn btn-primary" disabled>
        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
        {{ t('demo.loading') }}
      </button>
      <button class="btn btn-outline-success ms-2" disabled>
        <span class="spinner-grow spinner-grow-sm me-2" role="status"></span>
        {{ t('demo.processing') }}
      </button>
    </DemoSection>
  </div>
</template>
