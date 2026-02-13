<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import HeaderNotifyDropdown from './HeaderNotifyDropdown.vue'
import HeaderUserDropdown from './HeaderUserDropdown.vue'

const props = defineProps<{
  onOpenSidebar?: () => void
}>()

const route = useRoute()
const { t } = useI18n()
const pageTitle = computed(() => t((route.meta?.title as string) || 'common.appName'))

function handleOpenSidebar() {
  props.onOpenSidebar?.()
}
</script>

<template>
  <header class="app-header navbar navbar-expand bg-white border-bottom shadow-sm animate__animated animate__fadeInDown">
    <div class="container-fluid app-header-inner">
      <!-- Nút mở sidebar (ẩn trên desktop lg+ vì đã có sidebar cố định) -->
      <button
        v-if="onOpenSidebar"
        class="sidebar-toggler btn btn-outline-secondary me-2 d-flex align-items-center justify-content-center d-lg-none"
        type="button"
        :aria-label="t('common.openMenu')"
        :title="t('common.openMenu')"
        @click.prevent="handleOpenSidebar"
      >
        <i class="bi bi-list" aria-hidden="true"></i>
      </button>
      <span class="navbar-brand mb-0 h1 fs-6 text-truncate">{{ pageTitle }}</span>
      <div class="d-flex align-items-center ms-auto flex-shrink-0">
        <HeaderNotifyDropdown />
        <HeaderUserDropdown />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  min-height: 56px;
  position: sticky;
  top: 0;
  z-index: 1020;
}

/* Nút mở sidebar: rõ ràng, dễ bấm trên mobile */
.sidebar-toggler {
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  border-radius: 8px;
  font-size: 1.5rem;
}
.sidebar-toggler:hover {
  background-color: rgba(0, 0, 0, 0.06);
  border-color: var(--bs-secondary);
}

/* Desktop: header căn với main content (có chừa chỗ sidebar) */
@media (min-width: 992px) {
  .app-header-inner {
    margin-left: 240px;
  }
}
</style>
