<script setup lang="ts">
import { computed } from 'vue'
import SidebarBrand from './SidebarBrand.vue'
import SidebarNavItem from './SidebarNavItem.vue'
import { routes } from '../../router/routes'

const sidebarRoutes = computed(() => {
  return [...routes]
    .filter((r) => !r.meta?.hideInSidebar && r.name !== 'NotFound')
    .sort((a, b) => (a.meta?.order ?? 99) - (b.meta?.order ?? 99))
})
</script>

<template>
  <div class="sidebar-content">
    <SidebarBrand />
    <nav class="sidebar-nav px-2">
      <ul class="nav flex-column">
        <SidebarNavItem v-for="r in sidebarRoutes" :key="r.name as string" :route="r" />
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.sidebar-nav {
  padding-top: 0.5rem;
}
</style>
