<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { inject } from 'vue'
import SidebarContent from './SidebarContent.vue'

const route = useRoute()
const sidebarOpen = inject<{ value: boolean }>('sidebarOpen')!
const closeSidebar = inject<() => void>('closeSidebar')!

watch(
  () => route.path,
  () => closeSidebar()
)
</script>

<template>
  <!-- Desktop: sidebar cố định bên trái, chỉ hiện từ lg trở lên -->
  <aside
    class="app-sidebar app-sidebar-desktop d-none d-lg-block border-end bg-light"
    aria-label="Sidebar chính"
  >
    <SidebarContent />
  </aside>

  <!-- Mobile/Tablet: sidebar trượt từ trái, điều khiển bằng Vue state -->
  <div class="sidebar-overlay d-lg-none" :class="{ show: sidebarOpen?.value }" aria-hidden="true">
    <div class="sidebar-backdrop" aria-label="Đóng menu" @click="closeSidebar"></div>
    <div class="sidebar-drawer bg-light">
      <div class="sidebar-drawer-header border-bottom py-3 px-3 d-flex align-items-center justify-content-between">
        <span class="fw-bold">Menu</span>
        <button
          type="button"
          class="btn btn-link p-0 text-dark"
          aria-label="Đóng menu"
          @click="closeSidebar"
        >
          <i class="bi bi-x-lg fs-5"></i>
        </button>
      </div>
      <div class="sidebar-drawer-body">
        <SidebarContent />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-sidebar-desktop {
  width: 240px;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1030;
}

/* Overlay mobile: backdrop + drawer */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  z-index: 1040;
  pointer-events: none;
  visibility: hidden;
  transition: visibility 0.25s ease;
}
.sidebar-overlay.show {
  pointer-events: auto;
  visibility: visible;
}

.sidebar-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.25s ease;
}
.sidebar-overlay.show .sidebar-backdrop {
  opacity: 1;
}

.sidebar-drawer {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  max-width: 85vw;
  box-shadow: 0.25rem 0 0.5rem rgba(0, 0, 0, 0.15);
  transform: translateX(-100%);
  transition: transform 0.25s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.sidebar-overlay.show .sidebar-drawer {
  transform: translateX(0);
}

.sidebar-drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
}
</style>
