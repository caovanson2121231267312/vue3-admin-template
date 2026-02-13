<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      <div class="app-footer__left">
        <span class="app-footer__copy">&copy; {{ year }}</span>
        <span class="app-footer__app">{{ t('common.appName') }}</span>
        <span class="app-footer__by">{{ t('footer.madeBy') }}</span>
        <span class="app-footer__owner">caovanson</span>
      </div>
      <div class="app-footer__right">
        <a href="#" class="app-footer__link">{{ t('common.help') }}</a>
        <span class="app-footer__sep">·</span>
        <a href="#" class="app-footer__link">{{ t('common.contact') }}</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  flex-shrink: 0;
  background-color: var(--bs-body-bg);
  border-top: 1px solid var(--bs-border-color);
  padding: 0.75rem 1rem;
  margin-left: 0;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
@media (min-width: 992px) {
  .app-footer {
    margin-left: 260px;
  }
}

.app-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  font-size: 0.8125rem;
  color: var(--bs-body-color);
  opacity: 0.9;
}

.app-footer__left {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
}
.app-footer__copy {
  color: var(--bs-body-color);
}
.app-footer__app {
  font-weight: 500;
  color: var(--bs-body-color);
}
.app-footer__by {
  color: var(--bs-secondary, var(--bs-body-color));
  opacity: 0.85;
}
.app-footer__owner {
  font-weight: 600;
  color: var(--bs-primary);
  letter-spacing: 0.02em;
}

.app-footer__right {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.app-footer__sep {
  color: var(--bs-border-color);
  user-select: none;
}
.app-footer__link {
  color: var(--bs-body-color);
  text-decoration: none;
  opacity: 0.9;
}
.app-footer__link:hover {
  color: var(--bs-primary);
  opacity: 1;
}
</style>
