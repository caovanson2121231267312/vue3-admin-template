<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

function goHome() {
  router.push({ name: 'Dashboard' })
}
</script>

<template>
  <div class="text-center py-5 animate__animated animate__fadeIn">
    <h1 class="display-1 text-muted">{{ t('notFound.title') }}</h1>
    <p class="lead">{{ t('notFound.message') }}</p>
    <button class="btn btn-primary mt-3" @click="goHome">{{ t('notFound.goDashboard') }}</button>
  </div>
</template>
