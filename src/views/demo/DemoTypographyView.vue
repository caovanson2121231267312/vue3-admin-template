<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DemoSection from '../../components/demo/DemoSection.vue'

const { t } = useI18n()

const codeHeadings = `<h1>h1</h1>
<h2>h2</h2>
<h3>h3</h3>
<h4>h4</h4>
<h5>h5</h5>
<h6>h6</h6>
<p class="lead">Đoạn lead – nổi bật hơn.</p>`

const codeInline = `<p>Bạn có thể dùng <mark>mark</mark>, <del>del</del>, <s>s</s>, <ins>ins</ins>, <u>u</u>, <strong>strong</strong>, <em>em</em>.</p>
<p><code>code</code>, <kbd>kbd</kbd>, <small>small</small>.</p>`

const codeList = `<ul class="list-unstyled"><li>List unstyled</li></ul>
<ul class="list-inline"><li class="list-inline-item">Inline 1</li><li class="list-inline-item">Inline 2</li></ul>`

const codeTextUtil = `<p class="text-start">text-start</p>
<p class="text-center">text-center</p>
<p class="text-end">text-end</p>
<p class="text-muted">text-muted</p>
<p class="text-primary">text-primary</p>
<p class="text-uppercase">Uppercase</p>
<p class="fw-bold">fw-bold</p>
<p class="fst-italic">fst-italic</p>`
</script>

<template>
  <div class="demo-page animate__animated animate__fadeIn">
    <h1 class="h3 mb-2">{{ t('demo.typographyTitle') }}</h1>
    <p class="text-muted mb-4" v-html="t('demo.typographySubtitle').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></p>

    <DemoSection :title="t('demo.headingsLead')" :description="t('demo.headingsLeadDesc')" :code="codeHeadings" code-language="html">
      <h1 class="h1">h1</h1>
      <h2 class="h2">h2</h2>
      <h3 class="h3">h3</h3>
      <p class="lead mb-0">{{ t('demo.leadText') }}</p>
    </DemoSection>

    <DemoSection :title="t('demo.inlineElements')" :description="t('demo.inlineElementsDesc')" :code="codeInline" code-language="html">
      <p class="mb-2">{{ t('demo.inlineText') }} <mark>mark</mark>, <del>del</del>, <strong>strong</strong>, <em>em</em>.</p>
      <p class="mb-0"><code>code</code>, <kbd>kbd</kbd>, <small>small</small>.</p>
    </DemoSection>

    <DemoSection :title="t('demo.list')" :description="t('demo.listDesc')" :code="codeList" code-language="html">
      <ul class="list-unstyled mb-2">
        <li>{{ t('demo.listUnstyled') }} 1</li>
        <li>{{ t('demo.listUnstyled') }} 2</li>
      </ul>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">Inline 1</li>
        <li class="list-inline-item">Inline 2</li>
        <li class="list-inline-item">Inline 3</li>
      </ul>
    </DemoSection>

    <DemoSection :title="t('demo.textUtils')" :description="t('demo.textUtilsDesc')" :code="codeTextUtil" code-language="html">
      <p class="text-start mb-1">text-start</p>
      <p class="text-center mb-1">text-center</p>
      <p class="text-end mb-1">text-end</p>
      <p class="text-muted mb-1">text-muted</p>
      <p class="text-primary mb-1">text-primary</p>
      <p class="text-uppercase mb-1">Uppercase</p>
      <p class="fw-bold mb-0">fw-bold</p>
    </DemoSection>
  </div>
</template>
