<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SidebarContent from './SidebarContent.vue'

const props = defineProps<{
  open: boolean
  onClose: () => void
}>()
const { t } = useI18n()

const route = useRoute()

watch(() => route.path, () => props.onClose())
</script>

<template>
  <!-- Desktop: sidebar nền đen, active dùng gradient xanh nước biển -->
  <aside class="app-sidebar-desktop sidebar-theme-dark" :aria-label="t('common.menu')">
    <SidebarContent />
  </aside>

  <!-- Mobile: panel nền đen cùng style -->
  <Teleport to="body">
    <div
      class="sidebar-overlay-mobile"
      :class="{ 'sidebar-overlay-mobile--open': open }"
      role="dialog"
      aria-modal="true"
      :aria-label="t('common.menu')"
    >
      <div class="sidebar-overlay-mobile__backdrop" :aria-label="t('common.closeMenu')" @click="onClose"></div>
      <div class="sidebar-overlay-mobile__panel sidebar-theme-dark">
        <div class="sidebar-overlay-mobile__header">
          <span class="fw-bold sidebar-header-title">{{ t('common.menu') }}</span>
          <button type="button" class="btn btn-link p-0 sidebar-header-title" :aria-label="t('common.closeMenu')" @click="onClose">
            <i class="bi bi-x-lg fs-5"></i>
          </button>
        </div>
        <div class="sidebar-overlay-mobile__body">
          <SidebarContent />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.app-sidebar-desktop {
  width: 260px;
  height: 100vh;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1030;
  border-right: 1px solid var(--sidebar-border, rgba(255, 255, 255, 0.08));
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.app-sidebar-desktop :deep(.sidebar-content) {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.app-sidebar-desktop :deep(.sidebar-nav-wrap) {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>

<style>
/* Chỉ layout/overlay; màu sidebar do theme-sidebar.css + inject theme quyết định */

.sidebar-overlay-mobile {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  visibility: hidden;
  transition: visibility 0.3s ease;
}
.sidebar-overlay-mobile.sidebar-overlay-mobile--open {
  pointer-events: auto;
  visibility: visible;
}

.sidebar-overlay-mobile__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.sidebar-overlay-mobile--open .sidebar-overlay-mobile__backdrop {
  opacity: 1;
}

.sidebar-overlay-mobile__panel {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  max-width: 85vw;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1;
  /* background/border từ theme-sidebar.css */
}
.sidebar-overlay-mobile--open .sidebar-overlay-mobile__panel {
  transform: translateX(0);
}

.sidebar-overlay-mobile__header {
  padding: 1rem 1.25rem;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border-color từ theme-sidebar.css */
}
.sidebar-overlay-mobile__body {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
}
</style>
