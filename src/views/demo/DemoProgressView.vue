<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DemoSection from '../../components/demo/DemoSection.vue'
import AdminProgress from '../../components/admin/AdminProgress.vue'

const { t } = useI18n()

const codeBasic = `<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>`

const codeVariants = `<div class="progress mb-2">
  <div class="progress-bar bg-success" style="width: 40%"></div>
</div>
<div class="progress mb-2">
  <div class="progress-bar bg-info" style="width: 60%"></div>
</div>
<div class="progress">
  <div class="progress-bar bg-danger" style="width: 80%"></div>
</div>`

const codeStriped = `<div class="progress">
  <div class="progress-bar progress-bar-striped bg-primary" style="width: 50%"></div>
</div>`

const codeAnimated = `<div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" style="width: 75%"></div>
</div>`

const codeAdminProgress = `<AdminProgress :value="60" variant="primary" />
<AdminProgress :value="80" variant="success" striped animated show-label />`
</script>

<template>
  <div class="demo-page animate__animated animate__fadeIn">
    <h1 class="h3 mb-2">{{ t('demo.progressTitle') }}</h1>
    <p class="text-muted mb-4" v-html="t('demo.progressSubtitle').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></p>

    <DemoSection :title="t('demo.basic')" :description="t('demo.basicDesc')" :code="codeBasic" code-language="html">
      <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.colorVariants')" :description="t('demo.colorVariantsDesc')" :code="codeVariants" code-language="html">
      <div class="progress mb-2">
        <div class="progress-bar bg-success" style="width: 40%"></div>
      </div>
      <div class="progress mb-2">
        <div class="progress-bar bg-info" style="width: 60%"></div>
      </div>
      <div class="progress mb-0">
        <div class="progress-bar bg-danger" style="width: 80%"></div>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.striped')" :description="t('demo.stripedDesc')" :code="codeStriped" code-language="html">
      <div class="progress">
        <div class="progress-bar progress-bar-striped bg-primary" style="width: 50%"></div>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.animated')" :description="t('demo.animatedDesc')" :code="codeAnimated" code-language="html">
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" style="width: 75%"></div>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.adminProgress')" :description="t('demo.adminProgressDesc')" :code="codeAdminProgress" code-language="vue">
      <div class="d-flex flex-column gap-2" style="max-width: 300px;">
        <AdminProgress :value="60" variant="primary" />
        <AdminProgress :value="80" variant="success" striped animated show-label />
      </div>
    </DemoSection>
  </div>
</template>
