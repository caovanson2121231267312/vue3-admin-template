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
  <div class="sidebar-brand">
    <a href="#" class="sidebar-brand__link" @click.prevent="goHome">
      <span class="sidebar-brand__text">{{ t('common.appName') }}</span>
    </a>
  </div>
</template>

<style scoped>
.sidebar-brand {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.sidebar-brand__link {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--sidebar-text);
  transition: opacity 0.2s ease, color 0.2s ease;
}
.sidebar-brand__link:hover {
  opacity: 0.95;
  color: #fff;
}
</style>
