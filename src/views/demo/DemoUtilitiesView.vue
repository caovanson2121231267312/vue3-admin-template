<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DemoSection from '../../components/demo/DemoSection.vue'

const { t } = useI18n()

const codeMargin = `<div class="m-1">m-1 (margin all)</div>
<div class="m-3">m-3</div>
<div class="mt-2 mb-2">mt-2 mb-2</div>
<div class="ms-auto" style="width: fit-content;">ms-auto</div>`

const codePadding = `<div class="p-2 border">p-2</div>
<div class="pt-3 pb-3 border">pt-3 pb-3</div>`

const codeDisplay = `<div class="d-inline p-2 bg-primary text-white">d-inline</div>
<div class="d-inline p-2 bg-dark text-white">d-inline</div>
<div class="d-block mt-2">d-block</div>
<div class="d-flex gap-2 mt-2"><span>Flex</span><span>item</span></div>
<div class="d-none">d-none (ẩn)</div>`

const codeColor = `<div class="p-2 bg-primary text-white">bg-primary</div>
<div class="p-2 bg-success text-white">bg-success</div>
<div class="p-2 bg-opacity-50 bg-primary text-white">bg-opacity-50</div>`

const codeBorder = `<div class="border p-2 mb-2">border</div>
<div class="border border-primary p-2 mb-2">border-primary</div>
<div class="border rounded p-2 mb-2">rounded</div>
<div class="border rounded-circle d-inline-block p-3">circle</div>`

const codeFlex = `<div class="d-flex justify-content-between align-items-center border p-2">
  <span>Trái</span>
  <span>Giữa</span>
  <span>Phải</span>
</div>
<div class="d-flex gap-2 flex-wrap mt-2">
  <span class="p-2 bg-light border">gap-2</span>
  <span class="p-2 bg-light border">flex-wrap</span>
</div>`
</script>

<template>
  <div class="demo-page animate__animated animate__fadeIn">
    <h1 class="h3 mb-2">{{ t('demo.utilitiesTitle') }}</h1>
    <p class="text-muted mb-4" v-html="t('demo.utilitiesSubtitle').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></p>

    <DemoSection :title="t('demo.margin')" :description="t('demo.marginDesc')" :code="codeMargin" code-language="html">
      <div class="m-1 border p-1">m-1</div>
      <div class="m-2 border p-1">m-2</div>
      <div class="mt-2 mb-2 border p-1">mt-2 mb-2</div>
      <div class="ms-auto border p-1" style="width: fit-content;">ms-auto</div>
    </DemoSection>

    <DemoSection :title="t('demo.padding')" :description="t('demo.paddingDesc')" :code="codePadding" code-language="html">
      <div class="p-2 border d-inline-block me-2">p-2</div>
      <div class="pt-3 pb-3 ps-2 pe-2 border d-inline-block">pt-3 pb-3</div>
    </DemoSection>

    <DemoSection :title="t('demo.display')" :description="t('demo.displayDesc')" :code="codeDisplay" code-language="html">
      <div class="d-inline p-2 bg-primary text-white me-1">{{ t('demo.inline') }}</div>
      <div class="d-inline p-2 bg-dark text-white">{{ t('demo.inline') }}</div>
      <div class="d-flex gap-2 mt-2"><span class="p-2 bg-light border">Flex</span><span class="p-2 bg-light border">{{ t('demo.flexItem') }}</span></div>
    </DemoSection>

    <DemoSection :title="t('demo.bgColor')" :description="t('demo.bgColorDesc')" :code="codeColor" code-language="html">
      <div class="d-flex flex-wrap gap-2">
        <span class="p-2 bg-primary text-white rounded">primary</span>
        <span class="p-2 bg-success text-white rounded">success</span>
        <span class="p-2 bg-warning text-dark rounded">warning</span>
        <span class="p-2 bg-opacity-50 bg-primary text-white rounded">opacity-50</span>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.borderRounded')" :description="t('demo.borderRoundedDesc')" :code="codeBorder" code-language="html">
      <div class="border p-2 mb-2 d-inline-block me-2">border</div>
      <div class="border border-primary p-2 mb-2 d-inline-block me-2">border-primary</div>
      <div class="border rounded p-2 d-inline-block me-2">rounded</div>
      <div class="border rounded-circle d-inline-block p-3 bg-light">circle</div>
    </DemoSection>

    <DemoSection :title="t('demo.flexbox')" :description="t('demo.flexboxDesc')" :code="codeFlex" code-language="html">
      <div class="d-flex justify-content-between align-items-center border p-2">
        <span>{{ t('demo.left') }}</span>
        <span>{{ t('demo.center') }}</span>
        <span>{{ t('demo.right') }}</span>
      </div>
      <div class="d-flex gap-2 flex-wrap mt-2">
        <span class="p-2 bg-light border">gap-2</span>
        <span class="p-2 bg-light border">flex-wrap</span>
        <span class="p-2 bg-light border">{{ t('demo.flexItem') }}</span>
      </div>
    </DemoSection>
  </div>
</template>
