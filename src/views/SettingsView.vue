<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <h1 class="mb-4">{{ t('settings.title') }}</h1>
    <p class="text-muted mb-4">{{ t('settings.subtitle') }}</p>
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" id="darkMode" />
          <label class="form-check-label" for="darkMode">{{ t('common.darkMode') }}</label>
        </div>
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" id="notify" checked />
          <label class="form-check-label" for="notify">{{ t('common.enableNotifications') }}</label>
        </div>
        <hr />
        <button type="button" class="btn btn-primary">{{ t('common.saveChanges') }}</button>
      </div>
    </div>
  </div>
</template>
