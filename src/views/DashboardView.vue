<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { toast } from 'vue3-toastify'

const { t } = useI18n()

function showToast() {
  toast.success(t('dashboard.welcomeToast'))
}
</script>

<template>
  <div class="animate__animated animate__fadeIn">
    <h1 class="mb-4">{{ t('dashboard.title') }}</h1>
    <p class="text-muted mb-4">{{ t('dashboard.subtitle') }}</p>
    <div class="row g-3">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 animate__animated animate__fadeInUp" style="animation-delay: 0.1s">
          <div class="card-body">
            <h5 class="card-title text-primary"><i class="bi bi-people me-2"></i>{{ t('dashboard.users') }}</h5>
            <p class="card-text text-muted small">{{ t('dashboard.usersDesc') }}</p>
            <router-link :to="{ name: 'Users' }" class="btn btn-outline-primary btn-sm">{{ t('common.view') }}</router-link>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 animate__animated animate__fadeInUp" style="animation-delay: 0.2s">
          <div class="card-body">
            <h5 class="card-title text-success"><i class="bi bi-gear me-2"></i>{{ t('common.settings') }}</h5>
            <p class="card-text text-muted small">{{ t('dashboard.settingsDesc') }}</p>
            <router-link :to="{ name: 'Settings' }" class="btn btn-outline-success btn-sm">{{ t('common.view') }}</router-link>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 animate__animated animate__fadeInUp" style="animation-delay: 0.3s">
          <div class="card-body">
            <h5 class="card-title text-info"><i class="bi bi-bell me-2"></i>{{ t('common.notifications') }}</h5>
            <p class="card-text text-muted small">{{ t('dashboard.toastDemo') }}</p>
            <button class="btn btn-outline-info btn-sm" @click="showToast">{{ t('dashboard.sendToast') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
