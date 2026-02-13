<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DemoSection from '../../components/demo/DemoSection.vue'
import AdminAlert from '../../components/admin/AdminAlert.vue'

const { t } = useI18n()
const alertVisible = ref(true)

const codeAlertVariants = `<AdminAlert variant="primary" title="Tiêu đề">Nội dung alert primary.</AdminAlert>
<AdminAlert variant="success">Thành công!</AdminAlert>
<AdminAlert variant="danger" title="Lỗi">Đã xảy ra lỗi.</AdminAlert>`

const codeAlertDismissible = `<AdminAlert variant="info" dismissible v-model:visible="visible">
  Có thể đóng bằng nút X. Dùng v-model:visible để bind.
</AdminAlert>`

const codeBootstrapAlerts = `<div class="alert alert-primary" role="alert">Alert Bootstrap primary.</div>
<div class="alert alert-success alert-dismissible fade show" role="alert">
  Có thể đóng.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>`
</script>

<template>
  <div class="demo-page animate__animated animate__fadeIn">
    <h1 class="h3 mb-2">{{ t('demo.alertsTitle') }}</h1>
    <p class="text-muted mb-4" v-html="t('demo.alertsSubtitle').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></p>

    <DemoSection
      :title="t('demo.alertVariants')"
      :description="t('demo.alertVariantsDesc')"
      :code="codeAlertVariants"
      code-language="vue"
    >
      <div class="d-flex flex-column gap-2">
        <AdminAlert variant="primary" :title="t('demo.title')">{{ t('demo.infoContent') }}</AdminAlert>
        <AdminAlert variant="success">{{ t('demo.success') }}</AdminAlert>
        <AdminAlert variant="warning" :title="t('demo.warning')">{{ t('demo.needCheck') }}</AdminAlert>
        <AdminAlert variant="danger" :title="t('demo.error')">{{ t('demo.errorOccurred') }}</AdminAlert>
      </div>
    </DemoSection>

    <DemoSection
      :title="t('demo.alertDismissible')"
      :description="t('demo.alertDismissibleDesc')"
      :code="codeAlertDismissible"
      code-language="vue"
    >
      <AdminAlert variant="info" dismissible v-model:visible="alertVisible" :title="t('demo.title')">
        {{ t('demo.canClose') }}
      </AdminAlert>
    </DemoSection>

    <DemoSection
      :title="t('demo.bootstrapAlert')"
      :description="t('demo.bootstrapAlertDesc')"
      :code="codeBootstrapAlerts"
      code-language="html"
    >
      <div class="d-flex flex-column gap-2">
        <div class="alert alert-primary mb-0" role="alert">Alert Bootstrap primary.</div>
        <div class="alert alert-success mb-0" role="alert">{{ t('demo.success') }}</div>
        <div class="alert alert-warning mb-0" role="alert">{{ t('demo.warning') }}</div>
        <div class="alert alert-danger mb-0" role="alert">{{ t('demo.error') }}</div>
      </div>
    </DemoSection>
  </div>
</template>
