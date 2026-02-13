<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DemoSection from '../../components/demo/DemoSection.vue'
import AdminCard from '../../components/admin/AdminCard.vue'

const { t } = useI18n()
const cardCollapsed = ref(false)

const codeCardBasic = `<AdminCard title="Tiêu đề card">
  Nội dung bên trong. Có thể dùng slot.
</AdminCard>`

const codeCardVariant = `<AdminCard title="Card primary" variant="primary">
  Header màu primary.
</AdminCard>
<AdminCard title="Card success" variant="success">
  Header màu success.
</AdminCard>`

const codeCardCollapsible = `<AdminCard title="Có thể thu gọn" collapsible v-model:collapsed="collapsed">
  Nội dung. Bấm icon góc phải để thu gọn/mở.
</AdminCard>`

const codeCardOutline = `<AdminCard title="Outline" variant="outline-primary">
  Viền màu, header không nền.
</AdminCard>`

const codeBootstrapCard = `<div class="card">
  <div class="card-header">Header</div>
  <div class="card-body">Body</div>
  <div class="card-footer text-muted">Footer</div>
</div>`
</script>

<template>
  <div class="demo-page animate__animated animate__fadeIn">
    <h1 class="h3 mb-2">{{ t('demo.cardsTitle') }}</h1>
    <p class="text-muted mb-4" v-html="t('demo.cardsSubtitle').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></p>

    <DemoSection
      :title="t('demo.cardBasic')"
      :description="t('demo.cardBasicDesc')"
      :code="codeCardBasic"
      code-language="vue"
    >
      <AdminCard :title="t('demo.cardTitle')">
        {{ t('demo.cardContent') }}
      </AdminCard>
    </DemoSection>

    <DemoSection
      :title="t('demo.cardVariants')"
      description="primary, success, info, warning, danger, outline-*."
      :code="codeCardVariant"
      code-language="vue"
    >
      <div class="row g-2">
        <div class="col-md-6">
          <AdminCard title="Card primary" variant="primary">{{ t('demo.primaryHeader') }}</AdminCard>
        </div>
        <div class="col-md-6">
          <AdminCard title="Card success" variant="success">Header success.</AdminCard>
        </div>
      </div>
    </DemoSection>

    <DemoSection
      :title="t('demo.cardCollapsible')"
      :description="t('demo.cardCollapsibleDesc')"
      :code="codeCardCollapsible"
      code-language="vue"
    >
      <AdminCard :title="t('demo.cardCollapsible')" collapsible v-model:collapsed="cardCollapsed">
        {{ t('demo.clickToCollapse') }}
      </AdminCard>
    </DemoSection>

    <DemoSection
      :title="t('demo.cardOutline')"
      :description="t('demo.cardOutlineDesc')"
      :code="codeCardOutline"
      code-language="vue"
    >
      <AdminCard title="Outline primary" variant="outline-primary">
        {{ t('demo.outlineHeader') }}
      </AdminCard>
    </DemoSection>

    <DemoSection
      :title="t('demo.bootstrapCard')"
      :description="t('demo.bootstrapCardDesc')"
      :code="codeBootstrapCard"
      code-language="html"
    >
      <div class="card">
        <div class="card-header">{{ t('demo.header') }}</div>
        <div class="card-body">{{ t('demo.body') }} – {{ t('demo.content') }}</div>
        <div class="card-footer text-muted">{{ t('demo.footer') }}</div>
      </div>
    </DemoSection>
  </div>
</template>
