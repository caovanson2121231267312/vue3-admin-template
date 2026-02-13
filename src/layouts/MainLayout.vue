<script setup lang="ts">
import { ref, watch, provide } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()
const sidebarOpen = ref(false)

function openSidebar() {
  sidebarOpen.value = true
}
function closeSidebar() {
  sidebarOpen.value = false
}

provide('sidebarOpen', sidebarOpen)
provide('openSidebar', openSidebar)
provide('closeSidebar', closeSidebar)

watch(() => route.path, () => closeSidebar())
</script>

<template>
  <div class="main-layout d-flex flex-column min-vh-100">
    <AppHeader />
    <div class="main-wrapper d-flex flex-grow-1">
      <AppSidebar />
      <main class="main-content flex-grow-1 overflow-auto p-3 p-md-4">
        <div class="container-fluid">
          <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
        <AppFooter />
      </main>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  background-color: var(--bs-body-bg);
  margin-left: 0;
  min-width: 0; /* tránh overflow trên mobile */
}

/* Desktop (lg+): chừa chỗ cho sidebar cố định */
@media (min-width: 992px) {
  .main-content {
    margin-left: 240px;
  }
}

/* Transition cho chuyển trang */
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
