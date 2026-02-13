<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DemoSection from '../../components/demo/DemoSection.vue'
import AdminBadge from '../../components/admin/AdminBadge.vue'

const { t } = useI18n()

const codeVariants = `<span class="badge bg-primary">Primary</span>
<span class="badge bg-success">Success</span>
<span class="badge bg-danger">Danger</span>
<span class="badge bg-warning text-dark">Warning</span>
<span class="badge bg-info text-dark">Info</span>
<span class="badge bg-secondary">Secondary</span>
<span class="badge bg-dark">Dark</span>`

const codePill = `<span class="badge rounded-pill bg-primary">Pill</span>
<span class="badge rounded-pill bg-success">99+</span>`

const codeAdminBadge = `<AdminBadge variant="primary">Primary</AdminBadge>
<AdminBadge variant="success" rounded>Rounded</AdminBadge>`

const codePosition = `<button type="button" class="btn btn-primary position-relative">
  Thông báo
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">5</span>
</button>`
</script>

<template>
  <div class="demo-page animate__animated animate__fadeIn">
    <h1 class="h3 mb-2">{{ t('demo.badgesTitle') }}</h1>
    <p class="text-muted mb-4" v-html="t('demo.badgesSubtitle').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></p>

    <DemoSection :title="t('demo.variants')" description="badge bg-*" :code="codeVariants" code-language="html">
      <div class="d-flex flex-wrap gap-2 align-items-center">
        <span class="badge bg-primary">Primary</span>
        <span class="badge bg-success">Success</span>
        <span class="badge bg-danger">Danger</span>
        <span class="badge bg-warning text-dark">Warning</span>
        <span class="badge bg-info text-dark">Info</span>
        <span class="badge bg-secondary">Secondary</span>
        <span class="badge bg-dark">Dark</span>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.roundedPill')" :description="t('demo.roundedPillDesc')" :code="codePill" code-language="html">
      <div class="d-flex flex-wrap gap-2">
        <span class="badge rounded-pill bg-primary">Pill</span>
        <span class="badge rounded-pill bg-success">99+</span>
        <span class="badge rounded-pill bg-danger">New</span>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.adminBadge')" :description="t('demo.adminBadgeDesc')" :code="codeAdminBadge" code-language="vue">
      <div class="d-flex flex-wrap gap-2">
        <AdminBadge variant="primary">Primary</AdminBadge>
        <AdminBadge variant="success" rounded>Rounded</AdminBadge>
        <AdminBadge variant="danger">Danger</AdminBadge>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.badgeOnButton')" :description="t('demo.badgeOnButtonDesc')" :code="codePosition" code-language="html">
      <button type="button" class="btn btn-primary position-relative me-2">
        {{ t('common.notifications') }}
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">5</span>
      </button>
      <button type="button" class="btn btn-outline-secondary position-relative">
        {{ t('demo.mail') }}
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">3</span>
      </button>
    </DemoSection>
  </div>
</template>
