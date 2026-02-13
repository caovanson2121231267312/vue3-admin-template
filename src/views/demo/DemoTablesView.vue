<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DemoSection from '../../components/demo/DemoSection.vue'
import AdminTable from '../../components/admin/AdminTable.vue'

const { t } = useI18n()

const codeBasic = `<table class="table">
  <thead><tr><th>#</th><th>Tên</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>A</td></tr>
    <tr><td>2</td><td>B</td></tr>
  </tbody>
</table>`

const codeStripedHover = `<table class="table table-striped table-hover">
  <thead class="table-light">...</thead>
  <tbody>...</tbody>
</table>`

const codeBordered = `<table class="table table-bordered">
  ...
</table>`

const codeAdminTable = `<AdminTable hover striped>
  <thead class="table-light"><tr><th>#</th><th>Mục</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Hàng 1</td></tr>
  </tbody>
</AdminTable>`
</script>

<template>
  <div class="demo-page animate__animated animate__fadeIn">
    <h1 class="h3 mb-2">{{ t('demo.tablesTitle') }}</h1>
    <p class="text-muted mb-4" v-html="t('demo.tablesSubtitle').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></p>

    <DemoSection :title="t('demo.tableBasic')" :description="t('demo.tableBasicDesc')" :code="codeBasic" code-language="html">
      <div class="table-responsive">
        <table class="table mb-0">
          <thead><tr><th>#</th><th>{{ t('demo.name') }}</th><th>{{ t('common.status') }}</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>{{ t('demo.row1') }}</td><td><span class="badge bg-success">{{ t('demo.ok') }}</span></td></tr>
            <tr><td>2</td><td>{{ t('demo.row2') }}</td><td><span class="badge bg-warning text-dark">{{ t('demo.wait') }}</span></td></tr>
          </tbody>
        </table>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.stripedHover')" :description="t('demo.stripedHoverDesc')" :code="codeStripedHover" code-language="html">
      <AdminTable striped hover>
        <thead class="table-light">
          <tr><th>#</th><th>{{ t('demo.tableItem') }}</th><th>{{ t('demo.note') }}</th></tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>A</td><td>{{ t('demo.note') }} 1</td></tr>
          <tr><td>2</td><td>B</td><td>{{ t('demo.note') }} 2</td></tr>
          <tr><td>3</td><td>C</td><td>{{ t('demo.note') }} 3</td></tr>
        </tbody>
      </AdminTable>
    </DemoSection>

    <DemoSection :title="t('demo.bordered')" :description="t('demo.borderedDesc')" :code="codeBordered" code-language="html">
      <div class="table-responsive">
        <table class="table table-bordered mb-0">
          <thead><tr><th>#</th><th>Col 1</th><th>Col 2</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>X</td><td>Y</td></tr>
            <tr><td>2</td><td>X</td><td>Y</td></tr>
          </tbody>
        </table>
      </div>
    </DemoSection>

    <DemoSection :title="t('demo.adminTable')" :description="t('demo.adminTableDesc')" :code="codeAdminTable" code-language="vue">
      <AdminTable hover striped>
        <thead class="table-light"><tr><th>#</th><th>{{ t('demo.tableItem') }}</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>{{ t('demo.row1') }}</td></tr>
          <tr><td>2</td><td>{{ t('demo.row2') }}</td></tr>
        </tbody>
      </AdminTable>
    </DemoSection>
  </div>
</template>
