<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppSidebar from './components/AppSidebar.vue'
import AppFooter from './components/AppFooter.vue'
import HeaderNotifyDropdown from './components/HeaderNotifyDropdown.vue'
import HeaderLocaleSwitcher from './components/HeaderLocaleSwitcher.vue'
import HeaderUserDropdown from './components/HeaderUserDropdown.vue'

const route = useRoute()
const { t } = useI18n()
const sidebarOpen = ref(false)

const pageTitle = computed(() => t((route.meta?.title as string) || 'common.appName'))

function openSidebar() {
  sidebarOpen.value = true
}

function closeSidebar() {
  sidebarOpen.value = false
}

watch(() => route.path, closeSidebar)
</script>

<template>
  <div class="main-layout d-flex flex-column min-vh-100">
    <!-- Header: nút menu và nội dung, tất cả trong MainLayout -->
    <header class="app-header navbar navbar-expand bg-white border-bottom shadow-sm">
      <div class="container-fluid app-header-inner">
        <button
          type="button"
          class="sidebar-toggler btn btn-outline-secondary me-2 d-flex align-items-center justify-content-center d-lg-none"
          :aria-label="t('common.openMenu')"
          :title="t('common.openMenu')"
          @click="openSidebar"
        >
          <i class="bi bi-list" aria-hidden="true"></i>
        </button>
        <span class="navbar-brand mb-0 h1 fs-6 text-truncate">{{ pageTitle }}</span>
        <div class="d-flex align-items-center ms-auto flex-shrink-0">
          <HeaderLocaleSwitcher />
          <HeaderNotifyDropdown />
          <HeaderUserDropdown />
        </div>
      </div>
    </header>

    <div class="main-wrapper d-flex flex-grow-1 min-h-0">
      <AppSidebar :open="sidebarOpen" :on-close="closeSidebar" />
      <main class="main-content flex-grow-1 overflow-auto p-3 p-md-4">
        <div class="container-fluid">
          <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.app-header {
  min-height: 56px;
  position: sticky;
  top: 0;
  z-index: 1020;
}

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

@media (min-width: 992px) {
  .app-header-inner {
    margin-left: 260px;
  }
}

.main-content {
  background-color: var(--bs-body-bg);
  margin-left: 0;
  min-width: 0;
}

@media (min-width: 992px) {
  .main-content {
    margin-left: 260px;
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
