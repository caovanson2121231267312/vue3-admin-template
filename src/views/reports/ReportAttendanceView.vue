<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <div class="animate__animated animate__fadeIn">
    <h1 class="h3 mb-3">{{ t('nav.reportAttendance') }}</h1>
    <p class="text-muted">{{ t('reports.attendanceSubtitle') }}</p>
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <p class="text-muted mb-0">{{ t('reports.placeholder') }}</p>
      </div>
    </div>
  </div>
</template>
